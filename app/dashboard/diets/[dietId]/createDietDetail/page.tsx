"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { DietDetailForm } from './DetailForm'


interface Event {
    title: string;
    start: Date | string;
    allDay: boolean;
    id: number;
}

export default function Home() {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <div className="hidden flex-col md:flex w-full mt-3">
            <div className="flex-1 space-y-4 px-8">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Add Diet Details</h2>
                </div>
                <DietDetailForm />
            </div>
        </div>
    )
}