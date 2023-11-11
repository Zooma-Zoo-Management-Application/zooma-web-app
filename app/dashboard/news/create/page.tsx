import { NewsForm } from './NewsForm'

export default function CreateNewPage() {
  return (
    <div className='p-8 w-full'>
      <h2 className="text-3xl font-bold tracking-tight mb-4">Create New</h2>
      <div>
        <NewsForm />
      </div>
    </div>
  )
}
