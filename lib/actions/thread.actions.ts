// thread.actions.ts

'use server';


import { connectToDatabase } from '@/lib/database';
import User from '@/lib/database/models/user.model';  // Import User model first
import Thread from '@/lib/database/models/thread.model';
import Comment from '@/lib/database/models/comment.model';  // Import User model to ensure it's registered

// Create a new thread
export async function createThread(threadData: { title: string, description: string, user: string }) {
  try {
    await connectToDatabase();

    const newThread = await Thread.create({
      title: threadData.title,
      description: threadData.description,
      user: threadData.user, // Store Clerk User ID as ObjectId referencing User model
      comments: []  // Initialize with an empty comments array
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
    const threads = await Thread.find()
      .populate('user', 'firstName lastName') // Populate the user field with firstName and lastName
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          model: 'User',
          select: 'firstName lastName',
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
export async function upvoteThread(threadId: string) {
  try {
    await connectToDatabase();
    const thread = await Thread.findById(threadId);
    if (!thread) throw new Error('Thread not found');
    thread.upvotes += 1;
    await thread.save();
    return JSON.parse(JSON.stringify(thread));
  } catch (error) {
    console.error('Error upvoting thread:', error);
    throw new Error('Failed to upvote thread');
  }
}

// Downvote a thread
export async function downvoteThread(threadId: string) {
  try {
    await connectToDatabase();
    const thread = await Thread.findById(threadId);
    if (!thread) throw new Error('Thread not found');
    thread.downvotes += 1;
    await thread.save();
    return JSON.parse(JSON.stringify(thread));
  } catch (error) {
    console.error('Error downvoting thread:', error);
    throw new Error('Failed to downvote thread');
  }
}
