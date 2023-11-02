"use client"
import { withProtected } from '@/hooks/useAuth'

function AccountSettings() {
  return (
    <div className='min-h-[50vh]'>
      AccountSettings
    </div>
  )
}

export default withProtected(AccountSettings)