'use server';

import { connectToDatabase } from '@/lib/database';
import Comment from '@/lib/database/models/comment.model';
import Thread from '@/lib/database/models/thread.model';
import mongoose from 'mongoose'; // Import mongoose

// Add a comment to a thread
export async function addComment({ text, threadId }: { text: string, threadId: string }) {
  try {
    await connectToDatabase();
    const newComment = await Comment.create({ text, thread: new mongoose.Types.ObjectId(threadId) }); // Use mongoose.Types.ObjectId
    const thread = await Thread.findById(threadId);
    thread.comments.push(newComment._id);
    await thread.save();
    return JSON.parse(JSON.stringify(newComment));
  } catch (error) {
    console.error('Error adding comment:', error);
    throw new Error('Failed to add comment');
  }
}
