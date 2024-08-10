'use server';

import { connectToDatabase } from '@/lib/database';
import Thread from '@/lib/database/models/thread.model';
import { CreateThreadParams } from '@/types';

// Create a new thread
export async function createThread(thread: CreateThreadParams) {
  try {
    await connectToDatabase();
    const newThread = await Thread.create(thread);
    return JSON.parse(JSON.stringify(newThread));
  } catch (error) {
    console.error('Error creating thread:', error);
    throw new Error('Thread creation failed');
  }
}
