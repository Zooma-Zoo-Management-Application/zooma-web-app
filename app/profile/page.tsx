"use client"
import React, { useEffect } from 'react'
import { ProfileForm } from './components/ProfileForm'
import { Separator } from '@/components/ui/separator'
import { withProtected, withPublic } from '@/hooks/useAuth'
import useUserState from '@/stores/user-store'
import Loading from '@/components/shared/Loading'
import { useRouter } from 'next/navigation'
import { checkToken } from '@/lib/api/userAPI'

function ProfilePage() {
  const [currentUserState, setCurrentUserState] = React.useState(null);
  const router = useRouter();

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessTokenCheck = localStorage.getItem("accessToken");
        if(accessTokenCheck == null){
          router.replace("/authentication/login");
          return <Loading></Loading>;
        }
        checkToken(accessTokenCheck)
        .then((response:any) => {
          setCurrentUserState(response?.data);
          return response?.data;
        })
        .then((user) => {
          if (!user) {
            router.replace("/authentication/login");
            return <Loading></Loading>;
          }
        })
        .catch((err:any) => {
          console.log(err);
        })
      } catch (err:any) {
        console.log(err.message);
      } 
    };
    initialize();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <div className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </div>
      </div>
      <Separator />
      {
        currentUserState == null ? <div className='h-80'>
          <Loading></Loading>
        </div> : <ProfileForm currentUser={currentUserState}></ProfileForm>
      }
    </div>
  )
}

export default withProtected(ProfilePage)