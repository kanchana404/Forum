'use server';

import { connectToDatabase } from '@/lib/database';
import Thread from '@/lib/database/models/thread.model';
import User from '@/lib/database/models/user.model';
import { CreateThreadParams } from '@/types';

export async function createThread(thread: CreateThreadParams) {
  try {
    await connectToDatabase();

    // Find the user by Clerk ID
    const user = await User.findOne({ clerkId: thread.user });
    if (!user) throw new Error('User not found');

    const newThread = await Thread.create({
      ...thread,
      user: user._id,  // Use MongoDB ObjectId
      clerkUserId: thread.user,  // Store Clerk ID separately
    });
    return JSON.parse(JSON.stringify(newThread));
  } catch (error) {
    console.error('Error creating thread:', error);
    throw new Error('Thread creation failed');
  }
}
