'use client';

import { useState } from 'react';
import { upvoteThread, downvoteThread } from '@/lib/actions/thread.actions';

export default function VoteButtons({ thread }: { thread: any }) {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const handleUpvote = async () => {
    if (downvoted) return; // Can't upvote if already downvoted
    try {
      await upvoteThread(thread._id);
      setUpvoted(!upvoted);
    } catch (error) {
      console.error('Error upvoting:', error);
    }
  };

  const handleDownvote = async () => {
    if (upvoted) return; // Can't downvote if already upvoted
    try {
      await downvoteThread(thread._id);
      setDownvoted(!downvoted);
    } catch (error) {
      console.error('Error downvoting:', error);
    }
  };

  return (
    <div className="vote-buttons">
      <button onClick={handleUpvote} disabled={upvoted}>
        Upvote
      </button>
      <button onClick={handleDownvote} disabled={downvoted}>
        Downvote
      </button>
    </div>
  );
}
