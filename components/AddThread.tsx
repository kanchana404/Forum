// CreateThread.tsx

'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { createThread } from '@/lib/actions/thread.actions';

export default function CreateThread() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useUser(); // Get the current logged-in user

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
        user: user.id, // Include the user ID here as a string
      };
      await createThread(thread);
      alert('Thread created successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to create thread');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Create Thread</button>
    </form>
  );
}
