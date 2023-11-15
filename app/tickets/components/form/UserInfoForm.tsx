import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import FormWrapper from "./FormWrapper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type StepProps = {
  currentUser: any;
};

const UserInfoForm = ({
  currentUser,
}: StepProps) => {
  const router = useRouter()

  return (
    <FormWrapper
      title="Personal info"
      description={currentUser? "There is your information, you can update information in your profile." : "Please login or register to save your ticket"}
    >
      <div className="w-full flex flex-col gap-5">
        {
          currentUser ? (
            <div className="my-2 mb-8 space-y-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={currentUser?.avatarUrl} alt={currentUser?.userName} />
                <AvatarFallback>{currentUser?.userName?.toString().slice(0,2) || "U"}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" placeholder="Email" disabled value={currentUser?.email || "Your email"}/>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="email">Username</Label>
                  <Input type="text" id="usename" placeholder="Username" disabled value={currentUser?.userName || "Your userName"}/>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-start items-center gap-4 mb-20">
              <Button type="button" onClick={() => router.push("/authentication/login?callbackUrl=/tickets?step=3")}>
                Login
              </Button>
              Or
              <Button type="button" onClick={() => router.push("/authentication/signup?callbackUrl=/tickets?step=3")}>
                Sign Up
              </Button>
            </div>
          )
        }
      </div>
    </FormWrapper>
  );
};

export default UserInfoForm;