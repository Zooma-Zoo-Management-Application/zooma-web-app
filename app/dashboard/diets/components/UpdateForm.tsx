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
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import FirebaseService from "@/lib/FirebaseService"
import { getTypes, updateType } from "@/lib/api/typeAPI"
import { cn, isBase64Image } from "@/lib/utils"
import { getDownloadURL, ref, uploadBytes, } from "firebase/storage"
import Image from "next/image"
import { ChangeEvent, useEffect, useState } from "react"
import { updateSpecies } from "@/lib/api/speciesAPI"
import useRefresh from "@/stores/refresh-store"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { editDiet } from "@/lib/api/dietAPI"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"

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


type UpdateFormValues = z.infer<typeof formNewSchema>

export function UpdateForm({ id, data, setOpen }: any) {
    const [files, setFiles] = useState<File[]>([]);
    const [types, setTypes] = useState<any>([])

    const { refresh } = useRefresh()

    useEffect(() => {
        const initialize = async () => {
            try {
                const res = await getTypes();
                const { data } = res;
                setTypes(data);
            } catch (err: any) {
            }
        };
        initialize();
    }, [])

    const defaultValues: Partial<UpdateFormValues> = {
        name: data.name || "",
        description: data.description || "",
        goal: data.goal || "Not specific",
        updateAt: new Date(),
        scheduleAt: new Date(data.scheduleAt),
        endAt: new Date(data.endAt) || "",
        status: data.status
    }

    const form = useForm<UpdateFormValues>({
        resolver: zodResolver(formNewSchema),
        defaultValues,
        mode: "onChange",
    })

    const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
        e.preventDefault();

        const fileReader = new FileReader();

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            setFiles(Array.from(e.target.files));

            if (!file.type.includes("image")) return;

            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || '';
                fieldChange(imageDataUrl);
            }

            fileReader.readAsDataURL(file);
        }
    }

    async function onSubmit(values: UpdateFormValues) {
        let dietbody: any = {
            name: values.name,
            description: values.description,
            goal: values.goal,
            updateAt: new Date(),
            scheduleAt: values.scheduleAt,
            endAt: values.endAt,
            status: true
        };
        editDiet(id, dietbody)
            .then((res) => {
                toast({
                    title: "Diet updated",
                    description: "Diet has been updated successfully.",
                });
                setOpen(false);
            })

        setTimeout(() => {
            refresh();
        }, 1000);
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
                <Button type="submit">Update Diet Information</Button>
            </form>
        </Form>
    )
}