'use server';

import { connectToDatabase } from '@/lib/database';
import Thread from '@/lib/database/models/thread.model';
import Comment from '@/lib/database/models/comment.model';
import { ObjectId } from 'mongodb';

// Fetch all threads with user and comments
export async function fetchThreads() {
  try {
    await connectToDatabase();
    const threads = await Thread.find().populate('user').populate('comments');
    return JSON.parse(JSON.stringify(threads));
  } catch (error) {
    console.error('Error fetching threads:', error);
    throw new Error('Failed to fetch threads');
  }
}

// Create a new thread
export async function createThread(threadData: { title: string, description: string, user: string }) {
  try {
    await connectToDatabase();

    const newThread = await Thread.create({
      title: threadData.title,
      description: threadData.description,
      user: new ObjectId(threadData.user),
      clerkUserId: threadData.user,
    });

    return JSON.parse(JSON.stringify(newThread));
  } catch (error) {
    console.error('Error creating thread:', error);
    throw new Error('Failed to create thread');
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
  } catch (error) {
    console.error('Error downvoting thread:', error);
    throw new Error('Failed to downvote thread');
  }
}
