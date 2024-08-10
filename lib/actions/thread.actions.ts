'use server';

import { connectToDatabase } from '@/lib/database';
import Thread from '@/lib/database/models/thread.model';

export async function createThread(threadData: { title: string, description: string, user: string }) {
  try {
    await connectToDatabase();

    const newThread = await Thread.create({
      title: threadData.title,
      description: threadData.description,
      user: threadData.user, // Ensure this is stored as a string
    });

    return JSON.parse(JSON.stringify(newThread));
  } catch (error) {
    console.error('Error creating thread:', error);
    throw new Error('Failed to create thread');
  }
}
