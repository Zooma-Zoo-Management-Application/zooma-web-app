"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ChangeEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { editSkill, getSkills } from "@/lib/api/skillAPI"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import useUserState from "@/stores/user-store"
import { editExperience } from "@/lib/api/experienceAPI"

const formDetailSchema = z.object({
    description: z.string()
        .min(3, { message: 'Description must be at least 3 characters.' }),
    yearOfExperience: z.number(),
    status: z.number()
})

interface Skill {
    id: number,
    name: string
}

type FormDetailValues = z.infer<typeof formDetailSchema>

export function SkillDetailForm({ expParam }: any) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const defaultValues: Partial<FormDetailValues> = {
        description: expParam.description,
        yearOfExperience: expParam.yearOfExperience,
        status: 0
    }

    const form = useForm<FormDetailValues>({
        resolver: zodResolver(formDetailSchema),
        defaultValues,
        mode: "onChange",
    })

    async function onSubmit(values: FormDetailValues) {
        console.log("submit")
        let expBody: any = {
            description: values.description,
            yearOfExperience: values.yearOfExperience,
            status: 0
        };
        editExperience(expParam.id, expBody)
        toast({
            variant: "default",
            description: (
                <span className="text-l font-bold text-green-500">
                    Update Successfully!
                </span>
            ),
        })
        router.push("/dashboard/experience")
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="yearOfExperience"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Year of Experience</FormLabel>
                            <FormControl>
                                <Input type="number" min="0" placeholder="0" step={0.01} {...field} onChange={event => field.onChange(+event.target.value)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Diet's description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full hover:shadow-primary-md">Update Experience</Button>
            </form>
        </Form>
    )
}