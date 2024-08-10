// ThreadList.tsx

'use client';

import { useEffect, useState } from 'react';
import { fetchThreads } from '@/lib/actions/thread.actions';
import ThreadItem from './ThreadItem';

export default function ThreadList() {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchThreads();
        setThreads(data);
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {threads.map((thread: any) => (
        <ThreadItem key={thread._id} thread={thread} />
      ))}
    </div>
  );
}
