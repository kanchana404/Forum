'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { createThread } from '@/lib/actions/thread.actions';

export default function CreateThread() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('You need to be logged in to create a thread');
      return;
    }

    try {
      const thread = {
        title,
        description,
        user: user.id,
      };
      await createThread(thread);
      alert('Thread created successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to create thread');
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Create thread</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border border-gray-300 rounded-full w-full px-4 py-2 mb-4"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border border-gray-300 rounded-xl w-full px-4 py-2 mb-4"
        />
        <button type="submit" className="bg-purple-600 text-white rounded-full px-4 py-2">Create Thread</button>
      </form>
    </div>
  );
}