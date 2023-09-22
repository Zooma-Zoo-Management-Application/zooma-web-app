"use client"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import { string, z } from "zod";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { isBase64Image } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  user: {
    id: string,
    objectId: string,
    username: string,
    name: string,
    bio: string,
    image: string,
  };

  btnTitle: string;
}

export const AccountProfile = ({
  user,btnTitle
}: Props) => {


  return (
    <>
      TicketForm
    </>
  )
}
