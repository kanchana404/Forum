'use server';

import { connectToDatabase } from '@/lib/database';
import Comment from '@/lib/database/models/comment.model';
import Thread from '@/lib/database/models/thread.model';
import User from '@/lib/database/models/user.model'; // Import User model

export async function addComment({ text, threadId, user }: { text: string, threadId: string, user: string }) {
  try {
    await connectToDatabase();

    // Find the user by their Clerk ID
    const userRecord = await User.findOne({ clerkId: user });

    if (!userRecord) {
      throw new Error(`User not found with Clerk ID: ${user}`);
    }

    // Create the comment with the ObjectId of the user
    const comment = await Comment.create({
      text,
      thread: threadId,
      user: userRecord._id, // Store the user's ObjectId
    });

    // Add the comment to the thread
    const thread = await Thread.findById(threadId);
    thread.comments.push(comment._id);
    await thread.save();

    return JSON.parse(JSON.stringify(comment));
  } catch (error) {
    console.error('Error adding comment:', error);
    throw new Error('Failed to add comment');
  }
}
