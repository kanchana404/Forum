'use client';

export default function CommentList({ comments, showAll }: { comments: any[], showAll: boolean }) {
  const visibleComments = showAll ? comments : comments.slice(-2);

  return (
    <div className="comment-list">
      {visibleComments.map((comment: any) => (
        <p key={comment._id}>{comment.text}</p>
      ))}
    </div>
  );
}
