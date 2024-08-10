import AddThread from '@/components/AddThread'
import Navbar from '@/components/Navbar'
import ThreadList from '@/components/ThreadList'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar />
      <AddThread />
      <ThreadList />
    </div>
  )
}

export default page