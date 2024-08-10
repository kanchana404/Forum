// file: components/ThreadItem.tsx

'use client';

import { addComment } from '@/lib/actions/comment.actions';
import { useState } from 'react';
import VoteButtons from './VoteButtons';
import CommentList from './CommentList';
import { useUser } from '@clerk/nextjs';

export default function ThreadItem({ thread }: { thread: any }) {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(thread.comments || []);
  const [showAllComments, setShowAllComments] = useState(false);
  const { user } = useUser(); // Get the current logged-in user

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
    <div className="thread-item">
      <h2>{thread.title}</h2>
      <p>{thread.description}</p>
      <p>Posted by: {thread.user?.firstName} {thread.user?.lastName}</p>
      
      <VoteButtons threadId={thread._id} upvotes={thread.upvotes} downvotes={thread.downvotes} />
      
      <CommentList comments={comments} showAll={showAllComments} />
      {comments.length > 2 && !showAllComments && (
        <button onClick={() => setShowAllComments(true)}>See More</button>
      )}
      
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="Add a comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
        />
        <button type="submit">Comment</button>
      </form>
    </div>
  );
}
