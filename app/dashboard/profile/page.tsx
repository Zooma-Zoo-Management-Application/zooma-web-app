import { Button } from "@/components/ui/button";
import { AccountProfile } from "@/app/profile/components/AccountProfile";

export default function ProfilePage() {

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-8">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Your Profile</h2>
            <div className="flex items-center space-x-2">
              <Button className="cursor-pointer">Log out</Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            <div className="col-span-4">
              <AccountProfile 
                user={{
                  id: "1",
                  objectId: "1",
                  username: "NguyenA",
                  name: "Nguyen Van A",
                  bio: "A is a FPT Student",
                  image: "https://i.pravatar.cc/300?img=1",
                }}
                btnTitle="Update Profile"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}