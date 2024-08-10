'use client';

export default function CommentList({ comments, showAll }: { comments: any[], showAll: boolean }) {
  const visibleComments = showAll ? comments : comments.slice(-2);

  return (
    <div className="mt-4">
      {visibleComments.map((comment) => (
        <div key={comment._id} className="flex gap-4 items-start mb-4">
          <img src={comment.user.profileImageUrl} alt="User Avatar" className="rounded-full w-10 h-10" />
          <div>
            <p className="text-gray-600"><strong>{comment.user.firstName} {comment.user.lastName}:</strong> {comment.text}</p>
            <p className="text-sm text-gray-500">{/* Add Time Since Posted */}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
