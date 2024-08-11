"use client";

import Image from "next/image";

export default function CommentList({
  comments,
  showAll,
}: {
  comments: any[];
  showAll: boolean;
}) {
  const visibleComments = showAll ? comments : comments.slice(-2);

  return (
    <div className="mt-4">
      {visibleComments.map((comment) => (
        <div key={comment._id} className="flex gap-4 items-start mb-4">
          {/* Ensure you are pulling the correct field for the user's profile image URL */}
          <Image
            src={comment.userProfilePic}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="text-gray-600">
              <strong>
                {comment.userFirstName} {comment.user.lastName}:
              </strong>{" "}
              {comment.text}
            </p>
            <p className="text-sm text-gray-500">
              {/* Add Time Since Posted */}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
