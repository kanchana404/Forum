'use client';

import { upvoteThread, downvoteThread } from '@/lib/actions/thread.actions';
import { useState } from 'react';

export default function VoteButtons({ threadId, upvotes, downvotes }: { threadId: string, upvotes: number, downvotes: number }) {
  const [currentUpvotes, setCurrentUpvotes] = useState(upvotes);
  const [currentDownvotes, setCurrentDownvotes] = useState(downvotes);
  const [hasVoted, setHasVoted] = useState(false);

  const handleUpvote = async () => {
    if (hasVoted) return;

    try {
      await upvoteThread(threadId);
      setCurrentUpvotes(currentUpvotes + 1);
      setHasVoted(true);
    } catch (error) {
      console.error('Error upvoting:', error);
    }
  };

  const handleDownvote = async () => {
    if (hasVoted) return;

    try {
      await downvoteThread(threadId);
      setCurrentDownvotes(currentDownvotes + 1);
      setHasVoted(true);
    } catch (error) {
      console.error('Error downvoting:', error);
    }
  };

  return (
    <div className="flex items-center gap-4 mt-2">
      <button onClick={handleUpvote} disabled={hasVoted} className="text-green-500">
        <i className="fa fa-thumbs-up"></i> {currentUpvotes}
      </button>
      <button onClick={handleDownvote} disabled={hasVoted} className="text-red-500">
        <i className="fa fa-thumbs-down"></i> {currentDownvotes}
      </button>
    </div>
  );
}
