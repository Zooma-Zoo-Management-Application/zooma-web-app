"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Icons } from "@/components/shared/Icons"
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
import { editDiet, getDietById } from "@/lib/api/dietAPI"
import { cn, isBase64Image } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// This can come from your database or API.

const formNewSchema = z.object({
    name: z.string()
        .min(3, { message: 'Name must be at least 3 characters.' }),
    description: z.string()
        .min(3, { message: 'Description must be at least 3 characters.' }),
    goal: z.string()
        .min(3, { message: 'Goal must be at least 3 characters' }),
    updateAt: z.date({
        required_error: "Please select a date and time"
    }),
    scheduleAt: z.date({
        required_error: "Please select a date and time"
    }),
    endAt: z.date({
        required_error: "Please select a date and time"
    }),
    status: z.boolean()
})


type FormNewValues = z.infer<typeof formNewSchema>

export function NewsForm({ dietParam }: any) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter()

    const defaultValues: Partial<FormNewValues> = {
        name: dietParam.name || "",
        description: dietParam.description || "",
        goal: dietParam.goal || "Not specific",
        updateAt: new Date(),
        scheduleAt: new Date(dietParam.scheduleAt),
        endAt: new Date(dietParam.endAt) || "",
        status: dietParam.status
    }

    const form = useForm<FormNewValues>({
        resolver: zodResolver(formNewSchema),
        defaultValues,
        mode: "onChange",
    })


    async function onSubmit(values: FormNewValues) {
        setIsLoading(true);
        console.log("submit")
        let dietbody: any = {
            name: values.name,
            description: values.description,
            goal: values.goal,
            updateAt: new Date(),
            scheduleAt: values.scheduleAt,
            endAt: values.endAt,
            status: dietParam.status
        };
        editDiet(dietParam.id, dietbody)
            .finally(() => {
                setIsLoading(false);
                toast({
                    variant: "default",
                    description: (
                        <span className="text-l font-bold text-green-500">
                            Edit Successfully!
                        </span>
                    ),
                })
                router.push(`/dashboard/diets/${dietParam.id}/view`);
            })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Diet's name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-start">
                    <div className="pr-44">
                        <FormField
                            control={form.control}
                            name="scheduleAt"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Schedule at</FormLabel>
                                    <FormDescription>
                                        the scheduled date of this diet detail.
                                    </FormDescription>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(new Date(field.value), "MMM dd, yyyy")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="pr-44">
                        <FormField
                            control={form.control}
                            name="endAt"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>End at</FormLabel>
                                    <FormDescription>
                                        the ended date of this diet detail.
                                    </FormDescription>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(new Date(field.value), "MMM dd, yyyy")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name="goal"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Goal</FormLabel>
                            <FormControl>
                                <Input placeholder="Diet's goal" {...field} />
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
                <Button type="submit" disabled={isLoading}
                    className="w-full hover:shadow-primary-md">
                    {isLoading ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <>Edit Diet information</>
                    )
                    }
                </Button>
            </form>
        </Form>
    )
}