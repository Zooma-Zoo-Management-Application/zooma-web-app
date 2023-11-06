"use client"

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { SkillDetailForm } from './skillForm'


interface Event {
    title: string;
    start: Date | string;
    allDay: boolean;
    id: number;
}

export default function Home() {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <div className="hidden flex-col md:flex w-full">
            <div className="flex-1 space-y-4 px-8">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight pt-5">Create Diet</h2>
                </div>
                <SkillDetailForm />
            </div>
        </div>
    )
}