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
import { ChangeEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { createDiet } from "@/lib/api/dietAPI"

const formDetailSchema = z.object({
    name: z.string()
        .min(3, { message: 'Name must be at least 3 characters.' }),
    createAt: z.date(),
    updateAt: z.date().nullish(),
    scheduleAt: z.date({
        required_error: "Please select a date"
    }),
    endAt: z.date({
        required_error: "Please select a date"
    }),
    description: z.string()
        .min(3, { message: 'Description must be at least 3 characters.' }),
    goal: z.string().min(3, { message: 'Goal must be at least 3 characters.' }),
})


type FormDetailValues = z.infer<typeof formDetailSchema>

export function DietDetailForm() {
    const router = useRouter()
    const [date, setDate] = useState<Date>()

    const defaultValues: Partial<FormDetailValues> = {
        name: "",
        createAt: new Date(),
        updateAt: new Date(),
        scheduleAt: new Date(),
        endAt: new Date(),
        description: "",
        goal: ""
    }

    const form = useForm<FormDetailValues>({
        resolver: zodResolver(formDetailSchema),
        defaultValues,
        mode: "onChange",
    })

    async function onSubmit(values: FormDetailValues) {
        console.log("submit")
        let dietBody: any = {
            name: values.name,
            createAt: new Date(),
            updateAt: new Date(),
            scheduleAt: values.scheduleAt,
            endAt: values.endAt,
            description: values.description,
            goal: values.goal
        };
        createDiet(dietBody)
        toast({
            variant: "default",
            description: (
                <span className="text-l font-bold text-green-500">
                    Create Successfully!
                </span>
            ),
        })
        router.push("/dashboard/diets")
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
                                <Input placeholder="Name of diet detail" {...field} />
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
                                                        format(field.value, "MMM dd, yyyy")
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
                                                disabled={{ before: new Date() }}
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
                                                        format(field.value, "MMM dd, yyyy")
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
                                                disabled={{ before: new Date() }}
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
                                <Input placeholder="Goal of diet to archive" {...field} />
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
                <Button type="submit" className="w-full hover:shadow-primary-md">Create Diet</Button>
            </form>
        </Form>
    )
}