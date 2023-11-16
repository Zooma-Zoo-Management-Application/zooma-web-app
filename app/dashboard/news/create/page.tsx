"use client"

import { withProtected } from '@/hooks/useAuth'
import { NewsForm } from './NewsForm'

function CreateNewPage() {
  return (
    <div className='p-8 w-full'>
      <h2 className="text-3xl font-bold tracking-tight mb-4">Create New</h2>
      <div>
        <NewsForm />
      </div>
    </div>
  )
}

export default withProtected(CreateNewPage)
