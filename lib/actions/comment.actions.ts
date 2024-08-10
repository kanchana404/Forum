// comment.actions.ts

'use server';

import { connectToDatabase } from '@/lib/database';
import Comment from '@/lib/database/models/comment.model';
import Thread from '@/lib/database/models/thread.model';
import User from '@/lib/database/models/user.model'; // Import User model

export async function addComment({ text, threadId, user }: { text: string, threadId: string, user: string }) {
  try {
    await connectToDatabase();

    const comment = await Comment.create({
      text,
      thread: threadId,
      user, // Store the user's ID
    });

    const thread = await Thread.findById(threadId);
    thread.comments.push(comment._id);
    await thread.save();

    return JSON.parse(JSON.stringify(comment));
  } catch (error) {
    console.error('Error adding comment:', error);
    throw new Error('Failed to add comment');
  }
}
