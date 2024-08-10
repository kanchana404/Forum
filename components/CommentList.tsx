// CommentList.tsx

'use client';

export default function CommentList({ comments, showAll }: { comments: any[], showAll: boolean }) {
  const visibleComments = showAll ? comments : comments.slice(-2);

  return (
    <div className="comment-list">
      {visibleComments.map((comment) => (
        <div key={comment._id} className="comment-item">
          <p><strong>{comment.user.firstName} {comment.user.lastName}:</strong> {comment.text}</p>
        </div>
      ))}
    </div>
  );
}
