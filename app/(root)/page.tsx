
import Navbar from '@/components/Navbar'
import ThreadList from '@/components/ThreadList'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar />
     <Button asChild>
      <Link href={'/add-thread'}>Add Thread</Link>
     </Button>
     
      <ThreadList />
    </div>
  )
}

export default page