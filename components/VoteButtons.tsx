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
    <div className="vote-buttons">
      <button onClick={handleUpvote} disabled={hasVoted}>Upvote ({currentUpvotes})</button>
      <button onClick={handleDownvote} disabled={hasVoted}>Downvote ({currentDownvotes})</button>
    </div>
  );
}
