import React from 'react'
import { ProfileForm } from './components/ProfileForm'
import { Separator } from '@/components/ui/separator'
import { withProtected } from '@/hooks/useAuth'

function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <div className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </div>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}

export default withProtected(ProfilePage)