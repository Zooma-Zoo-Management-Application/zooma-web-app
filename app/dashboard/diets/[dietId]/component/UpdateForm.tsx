"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { editDietDetail } from "@/lib/api/DietDetailAPI"
import { getFoods } from "@/lib/api/foodAPI"
import { getTypes } from "@/lib/api/typeAPI"
import { cn } from "@/lib/utils"
import useRefresh from "@/stores/refresh-store"
import { format } from "date-fns"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { ChangeEvent, useEffect, useState } from "react"
import { Calendar } from "@/components/ui/calendar"

const items = [
    { id: "1", label: "Monday", },
    { id: "2", label: "Tuesday", },
    { id: "3", label: "Wednesday", },
    { id: "4", label: "Thursday", },
    { id: "5", label: "Friday", },
    { id: "6", label: "Saturday", },
    { id: "0", label: "Sunday", },
] as const

function start(date: Date, time: any) {
    date.setDate(date.getDate() + 1)
    let dateStr = date.toISOString()
    return `${dateStr.split("T")[0]}T${time}Z`;
}

function localZoneToUTC(date: Date) {
    date.setDate(date.getDate() + 1)
    let dateStr = date.toLocaleString()
    return `${dateStr}`;
}

const formDetailSchema = z.object({
    name: z.string()
        .min(3, { message: 'Name must be at least 3 characters.' }),
    feedingTime: z.string(),
    updateAt: z.date({
        required_error: "Please select a date"
    }),
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
    status: z.boolean(),
    quantity: z.number({
        required_error: "required",
        invalid_type_error: "must be a number",
    }),
    foodId: z.number({
        required_error: "required",
        invalid_type_error: "must be a number",
    }),
})

interface food {
    id: number,
    name: string,
    description: string,
    energyValue: number,
    imageUrl: string
}

type UpdateFormValues = z.infer<typeof formDetailSchema>

export function UpdateForm({ id, valuesParam, setOpen }: any) {
    const [files, setFiles] = useState<File[]>([]);
    const [types, setTypes] = useState<any>([])
    const [foods, setFoods] = useState<food[]>([])

    const { refresh } = useRefresh()

    useEffect(() => {
        const initialize = async () => {
            try {
                const res = await getTypes();
                const { data } = res;
                setTypes(data);
                const res1 = await getFoods();
                setFoods(res1.data);
            } catch (err: any) {
            }
        };
        initialize();
    }, [])

    const defaultValues: Partial<UpdateFormValues> = {
        name: valuesParam.name || "",
        description: valuesParam.description || "",
        updateAt: new Date(),
        scheduleAt: new Date(valuesParam.scheduleAt),
        endAt: new Date(valuesParam.endAt) || "",
        feedingDate: valuesParam.feedingDate || [],
        foodId: valuesParam.foodId,
        quantity: valuesParam.quantity,
        status: valuesParam.status,
        feedingTime: valuesParam.feedingTime
    }

    const form = useForm<UpdateFormValues>({
        resolver: zodResolver(formDetailSchema),
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
        let schedule = new Date(start(values.scheduleAt, values.feedingTime))

        console.log(localZoneToUTC(values.endAt))
        let DietDetailBody: any = {
            name: values.name,
            description: values.description,
            updateAt: new Date(),
            scheduleAt: schedule,
            endAt: new Date(values.endAt),
            feedingDate: values.feedingDate,
            quantity: Number(values.quantity),
            status: true,
            foodId: values.foodId,
            dietId: valuesParam.dietId
        };
        console.log(DietDetailBody)
        editDietDetail(id, DietDetailBody)
            .then((res) => {
                {
                    (res.error) ? (
                        toast({
                            variant: "destructive",
                            title: "Diet Detail updated fail",
                            description: res.error,
                        })
                    ) : (
                        toast({
                            title: "Diet Detail updated",
                        })
                    )
                }
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
                                <Input placeholder="Name of diet detail" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-start">
                    <div className="w-52 mr-32">
                        <FormField
                            control={form.control}
                            name="feedingTime"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Feeding Time</FormLabel>
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
                    </div>
                    <div className="pr-32">
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
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="">
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
                    render={({ field }) => (
                        <FormItem>
                            <div className="mb-4">
                                <FormLabel className="text-base">Feeding Date</FormLabel>
                                <FormDescription>
                                    {/* the current feeding day: {field} */}
                                </FormDescription>
                            </div>
                            <div className="flex justify-start">
                                {items.map((item) => (
                                    <FormField
                                        key={item.id}
                                        control={form.control}
                                        name="feedingDate"
                                        render={({ field }) => {
                                            return (
                                                <FormItem
                                                    key={item.id}
                                                    className="flex flex-row items-start space-x-1 -space-y-px pl-10"
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
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-start">
                    <div className="pr-52">
                        <FormField
                            control={form.control}
                            name="foodId"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Food</FormLabel>
                                    <FormDescription>
                                        select Food
                                    </FormDescription>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-[200px] flex justify-between font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? foods.find(
                                                            (food) => food.id === field.value
                                                        )?.name
                                                        : "select food"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search food..." />
                                                <CommandEmpty>Not found.</CommandEmpty>
                                                <CommandGroup>
                                                    {foods.map((food) => (
                                                        <CommandItem
                                                            key={food.id}
                                                            value={food.name}
                                                            onSelect={() => {
                                                                form.setValue("foodId", food.id)
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    food.id === field.value ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {food.name}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
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
                            name="quantity"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Quantity</FormLabel>
                                    <FormDescription>
                                        in Kilogram(Kg)
                                    </FormDescription>
                                    <FormControl>
                                        <Input type="number" min="0" placeholder="0" step={0.01} {...field} onChange={event => field.onChange(+event.target.value)} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
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
                <Button type="submit">Update Diet Information</Button>
            </form>
        </Form>
    )
}
