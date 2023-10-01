import React from 'react'

function ViewPage() {
  return (
    <div>
      <div className='grid grid-cols-2'>
        <section className='space-y-4'>
          <div className='bg-red-400 w-20 h-20'>
            Mot
          </div>
          <div className='bg-yellow-400 w-20 h-20'>
            Hai
          </div>
          <div className='bg-red-400 w-20 h-20'>
            Ba
          </div>
        </section>

        <section>
          <div className='bg-red-400 w-20 h-20'>
            Mot
          </div>
          <div className='bg-yellow-400 w-20 h-20'>
          Hai
          </div>
          <div className='bg-red-400 w-20 h-20'>
          Ba
          </div>
        </section>
      </div>
    </div>
  )
}

export default ViewPage