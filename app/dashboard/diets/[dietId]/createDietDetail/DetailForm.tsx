"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const items = [
    { id: "1", label: "Monday", },
    { id: "2", label: "Tuesday", },
    { id: "3", label: "Wednesday", },
    { id: "4", label: "Thursday", },
    { id: "5", label: "Friday", },
    { id: "6", label: "Saturday", },
    { id: "7", label: "Sunday", },
] as const

const formDetailSchema = z.object({
    name: z.string()
        .min(3, { message: 'Name must be at least 3 characters.' }),
    feedingTime: z.string(),
    scheduleAt: z.date({
        required_error: "Please select a date"
    }),
    endAt: z.date({
        required_error: "Please select a date"
    }),
    description: z.string()
        .min(3, { message: 'Name must be at least 3 characters.' }),
    feedingDate: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
})


type FormDetailValues = z.infer<typeof formDetailSchema>

export function DietDetailForm() {
    const [files, setFiles] = useState<File[]>([]);
    const router = useRouter()

    const defaultValues: Partial<FormDetailValues> = {
        name: "",
        scheduleAt: new Date(),
        endAt: new Date(),
        description: "",
        feedingDate: ["1","2"],
    }

    const form = useForm<FormDetailValues>({
        resolver: zodResolver(formDetailSchema),
        defaultValues,
        mode: "onChange",
    })

    async function onSubmit(values: FormDetailValues) {
        console.log("submit")
        let newsbody: any = {
            name: values.name,
            feedingTime: Date.parse(values.feedingTime),
            scheduleAt: values.scheduleAt,
            endAt: values.endAt,
            description: values.description
        };
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-max-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white-300">{JSON.stringify(values, null, 1)}</code>
                </pre>
            ),
        })
        window.location.href = "/dashboard/diets/calendar"
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
                <FormField
                    control={form.control}
                    name="feedingTime"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormDescription>
                                the feeding time of this Detail.
                            </FormDescription>
                            <FormControl>
                                <Input type="time" {...field} />
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
                                                        format(field.value, "MMM dd, yyyy H:mma")
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
                                                        format(field.value, "PPP")
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
                    name="feedingDate"
                    render={() => (
                        <FormItem>
                            <div className="mb-4">
                                <FormLabel className="text-base">Sidebar</FormLabel>
                                <FormDescription>
                                Select the items you want to display in the sidebar.
                                </FormDescription>
                            </div>
                            {items.map((item) => (
                                <FormField
                                key={item.id}
                                control={form.control}
                                name="feedingDate"
                                render={({ field }) => {
                                    return (
                                    <FormItem
                                        key={item.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                        <FormControl>
                                        <Checkbox
                                            checked={field.value?.includes(item.id)}
                                            onCheckedChange={(checked) => {
                                            return checked
                                                ? field.onChange([...field.value, item.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                    (value) => value !== item.id
                                                    )
                                                )
                                            }}
                                        />
                                        </FormControl>
                                        <FormLabel className="text-sm font-normal">
                                        {item.label}
                                        </FormLabel>
                                    </FormItem>
                                    )
                                }}
                                />
                            ))}
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
                                <Input placeholder="Diet detail's description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full hover:shadow-primary-md">Create New</Button>
            </form>
        </Form>
    )
}