'use client';

import { addComment } from '@/lib/actions/comment.actions';
import { useState } from 'react';
import VoteButtons from './VoteButtons';
import CommentList from './CommentList';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';

export default function ThreadItem({ thread }: { thread: any }) {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(thread.comments || []);
  const [showAllComments, setShowAllComments] = useState(false);
  const { user } = useUser();

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('You need to be logged in to comment');
      return;
    }
    try {
      const newComment = await addComment({ text: commentText, threadId: thread._id, user: user.id });
      setComments([...comments, newComment]);
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4">
      <div className="flex items-start gap-4">
        {/* Use the userProfilePic field to display the user's profile picture */}
        <Image src={thread.userProfilePic} alt="User Avatar" width={50} height={50} className="rounded-full" />
        <div className="flex-grow">
          <h2 className="text-lg font-semibold">{thread.title}</h2>
          <p className="text-gray-600">{thread.description}</p>
          <p className="text-sm text-gray-500">Posted by: {thread.userFirstName} {thread.user.lastName}</p>
        </div>
        <div className="text-gray-500 text-sm">{/* Add Time Since Posted */}</div>
      </div>
      
      <VoteButtons
        threadId={thread._id}
        upvotes={thread.upvotes}
        downvotes={thread.downvotes}
        // Safely access voters array, defaulting to an empty array if undefined
        initialUserVote={thread.voters?.find((vote: { userId: string }) => vote.userId === user?.id)?.type || null}
      />
      
      <CommentList comments={comments} showAll={showAllComments} />
      {comments.length > 2 && !showAllComments && (
        <button onClick={() => setShowAllComments(true)} className="text-purple-600 mt-2">See More</button>
      )}
      
      <form onSubmit={handleCommentSubmit} className="mt-4">
        <input
          type="text"
          placeholder="Add a comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
          className="border border-gray-300 rounded-full w-full px-4 py-2"
        />
        <button type="submit" className="bg-purple-600 text-white rounded-full px-4 py-2 mt-2">Comment</button>
      </form>
    </div>
  );
}
