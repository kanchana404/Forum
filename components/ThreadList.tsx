'use client';

import { useEffect, useState } from 'react';
import { fetchThreads } from '@/lib/actions/thread.actions';
import ThreadItem from './ThreadItem';

export default function ThreadList() {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const fetchAllThreads = async () => {
      const data = await fetchThreads();
      setThreads(data);
    };

    fetchAllThreads();
  }, []);

  return (
    <div>
      {threads.map((thread: any) => (
        <ThreadItem key={thread._id} thread={thread} />
      ))}
    </div>
  );
}
