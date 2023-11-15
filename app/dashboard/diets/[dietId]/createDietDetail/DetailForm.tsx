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
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import { getFoods } from "@/lib/api/foodAPI"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "@/components/ui/use-toast"
import { createDietDetail } from "@/lib/api/DietDetailAPI"

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
    dietId: z.number({
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

type FormDetailValues = z.infer<typeof formDetailSchema>

export function DietDetailForm() {
    const { dietId } = useParams();
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [foods, setFoods] = useState<food[]>([])

    useEffect(() => {
        const initialize = async () => {
            try {
                const res = await getFoods();
                setFoods(res.data);
            } catch (err: any) {
                setError(`Error initializing the app: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        };
        initialize();
    }, [])
    const defaultValues: Partial<FormDetailValues> = {
        name: "",
        description: "",
        updateAt: new Date(),
        scheduleAt: new Date(),
        endAt: new Date(),
        feedingDate: [],
        status: true,
        dietId: Number(dietId),
        foodId: 0
    }

    const form = useForm<FormDetailValues>({
        resolver: zodResolver(formDetailSchema),
        defaultValues,
        mode: "onChange",
    })

    console.log("error", form.formState.errors)

    async function onSubmit(values: FormDetailValues) {
        console.log("submit")
        let DietDetailBody: any = {
            name: values.name,
            feedingTime: Date.parse(values.feedingTime),
            scheduleAt: values.scheduleAt.setTime(Date.parse(values.feedingTime)),
            endAt: values.endAt,
            description: values.description,
            updateAt: new Date(),
            feedingDate: values.feedingDate,
            quantity: +values.quantity,
            status: true,
            dietId: +dietId,
            foodId: values.foodId,
        };
        createDietDetail(DietDetailBody)
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
            })
        router.push(`/dashboard/diets/${dietId}/view`);
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
                    render={({ field }) => (
                        <FormItem>
                            <div className="mb-4">
                                <FormLabel className="text-base">Feeding Date</FormLabel>
                                <FormDescription>
                                    Choose the feeding days in a week(apply for every week)
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
                                    <Popover open={open} onOpenChange={setOpen}>
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
                <Button type="submit" className="w-full hover:shadow-primary-md">Create Diet Detail</Button>
            </form>
        </Form>
    )
}