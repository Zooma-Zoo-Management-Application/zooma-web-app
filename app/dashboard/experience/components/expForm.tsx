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
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { getSkills } from "@/lib/api/skillAPI"
import { createExperience } from "@/lib/api/experienceAPI"
import { Check, ChevronsUpDown } from "lucide-react"
import useUserState from "@/stores/user-store"

const formDetailSchema = z.object({
    description: z.string()
        .min(3, { message: 'Description must be at least 3 characters.' }),
    yearOfExperience: z.number({
        required_error: "required",
    })
        .int({ message: "must an integer" })
        .gt(0, { message: "must greater than 0" })
        .lte(50, { message: "must equal or less than 50" }),
    skillId: z.number({
        required_error: "required",
    }),
    userId: z.number()
})

interface Skill {
    id: number,
    name: string
}


type FormDetailValues = z.infer<typeof formDetailSchema>

export function SkillDetailForm() {
    const router = useRouter()
    const [skills, setSkills] = useState<Skill[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { currentUser } = useUserState();

    useEffect(() => {
        const initialize = async () => {
            try {
                const res = await getSkills();
                setSkills(res.data);
            } catch (err: any) {
                setError(`Error initializing the app: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        };
        initialize();
    }, [])

    const defaultValues: Partial<FormDetailValues> = {
        description: "",
        yearOfExperience: 0,
        userId: currentUser?.id || 1,
        skillId: 0,
    }

    const form = useForm<FormDetailValues>({
        resolver: zodResolver(formDetailSchema),
        defaultValues,
        mode: "onChange",
    })
    console.log(error)
    async function onSubmit(values: FormDetailValues) {
        console.log("submit")
        let expBody: any = {
            description: values.description,
            yearOfExperience: values.yearOfExperience,
            skillId: values.skillId,
            userId: currentUser.id
        };
        console.log(expBody)
        createExperience(expBody)
            .then((response) => {
                toast({
                    title: "Create successfully",
                    description: response.error
                })
                setIsLoading(false);
            })
            .catch((error) => {
                toast({
                    title: "Delete Error",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-light">{JSON.stringify(error.message, null, 2)}</code>
                        </pre>
                    )
                })
                setIsLoading(false);
            })
            .finally(() => {
                setIsLoading(false);
            })
        router.push("/dashboard/experience")
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex justify-start">
                    <div className="pr-80">
                        <FormField
                            control={form.control}
                            name="skillId"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Skill</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-[200px] justify-between font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? skills.find(
                                                            (skill) => skill.id === field.value
                                                        )?.name
                                                        : "Select skill"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search skill..." />
                                                <CommandEmpty>No skill found.</CommandEmpty>
                                                <CommandGroup>
                                                    {skills.map((skill) => (
                                                        <CommandItem
                                                            value={skill.name}
                                                            key={skill.id}
                                                            onSelect={() => {
                                                                form.setValue("skillId", skill.id)
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    skill.id === field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                            {skill.name}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        This is the skill of this Experience.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="pr-44">
                        <FormField
                            control={form.control}
                            name="yearOfExperience"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Year of Experience</FormLabel>
                                    <FormControl>
                                        <Input type="number" min="1" placeholder="0" {...field} onChange={event => field.onChange(+event.target.value)} />
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
                                <Textarea placeholder="Diet's description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full hover:shadow-primary-md">Create Experience</Button>
            </form>
        </Form>
    )
}
