'use server';

import { connectToDatabase } from '@/lib/database';
import User from '@/lib/database/models/user.model';
import Thread from '@/lib/database/models/thread.model';
import Vote from '@/lib/database/models/vote.model';
import mongoose from 'mongoose';

// Create a new thread
export async function createThread(threadData: { title: string, description: string, user: string }) {
  try {
    await connectToDatabase();

    const userRecord = await User.findOne({ clerkId: threadData.user });

    if (!userRecord) {
      throw new Error('User not found');
    }

    const newThread = await Thread.create({
      title: threadData.title,
      description: threadData.description,
      user: userRecord._id,
      userFirstName: userRecord.firstName,
      userProfilePic: userRecord.photo,
      comments: [],
      upvotes: 0,
      downvotes: 0,
      voters: [],
    });

    return JSON.parse(JSON.stringify(newThread));
  } catch (error) {
    console.error('Error creating thread:', error);
    throw new Error('Failed to create thread');
  }
}

// Fetch all threads with comments populated
export async function fetchThreads() {
  try {
    await connectToDatabase();

    const threads = await Thread.find({})
      .populate('user', 'firstName lastName photo')  // Ensure user details are populated
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          model: 'User',
          select: 'firstName lastName photo',
        },
      })
      .exec();

    return JSON.parse(JSON.stringify(threads));
  } catch (error) {
    console.error('Error fetching threads:', error);
    throw new Error('Failed to fetch threads');
  }
}

// Upvote a thread
export async function upvoteThread(threadId: string, clerkId: string) {
  try {
    await connectToDatabase();

    // Fetch the user object to get the correct ObjectId
    const user = await User.findOne({ clerkId });
    if (!user) {
      throw new Error('User not found');
    }

    const userObjectId = user._id;

    const thread = await Thread.findById(threadId);
    if (!thread) throw new Error('Thread not found');

    const existingVote = await Vote.findOne({ userId: userObjectId, threadId });

    if (existingVote) {
      if (existingVote.type === 'upvote') {
        return JSON.parse(JSON.stringify(thread));
      } else {
        thread.downvotes -= 1;
        thread.upvotes += 1;
        existingVote.type = 'upvote';
        await existingVote.save();
      }
    } else {
      thread.upvotes += 1;
      await Vote.create({ userId: userObjectId, threadId, type: 'upvote' });
    }

    await thread.save();
    return JSON.parse(JSON.stringify(thread));
  } catch (error) {
    console.error('Error upvoting thread:', error);
    throw new Error('Failed to upvote thread');
  }
}

// Downvote a thread
export async function downvoteThread(threadId: string, clerkId: string) {
  try {
    await connectToDatabase();

    // Fetch the user object to get the correct ObjectId
    const user = await User.findOne({ clerkId });
    if (!user) {
      throw new Error('User not found');
    }

    const userObjectId = user._id;

    const thread = await Thread.findById(threadId);
    if (!thread) throw new Error('Thread not found');

    const existingVote = await Vote.findOne({ userId: userObjectId, threadId });

    if (existingVote) {
      if (existingVote.type === 'downvote') {
        return JSON.parse(JSON.stringify(thread));
      } else {
        thread.upvotes -= 1;
        thread.downvotes += 1;
        existingVote.type = 'downvote';
        await existingVote.save();
      }
    } else {
      thread.downvotes += 1;
      await Vote.create({ userId: userObjectId, threadId, type: 'downvote' });
    }

    await thread.save();
    return JSON.parse(JSON.stringify(thread));
  } catch (error) {
    console.error('Error downvoting thread:', error);
    throw new Error('Failed to downvote thread');
  }
}
