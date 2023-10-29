"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Button } from '@/components/ui/button'
import { useState } from 'react'


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
                    <h2 className="text-3xl font-bold tracking-tight">Diet Management</h2>
                    <a href="/dashboard/diets/calendar/createDietDetail">
                        <Button>
                            Create Detail
                        </Button>
                    </a>
                </div>
            </div>
            <div className="w-full p-5" >
                <FullCalendar

                    plugins={[
                        dayGridPlugin,
                        interactionPlugin,
                        timeGridPlugin
                    ]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'resourceTimelineWook, dayGridMonth,timeGridWeek'
                    }}
                    events={[
                        { title: 'event 1', startTime: '12:30:00', endTime: '13:00:00', daysOfWeek: ['2'] },
                        { title: 'event 2', date: '2023-10-12T12:30:00' },
                        { title: 'event 3', date: '2023-10-12T12:30:00Z' },
                        { title: 'event 4', date: '2023-10-12T12:30:00Z' },
                        { title: 'event 5', date: '2023-10-12T12:30:00Z' },
                        { title: 'event 2', date: '2023-10-15' }
                    ]}
                    aspectRatio={2.8}
                    slotMinTime={'04:00:00'}
                    slotMaxTime={'22:00:00'}
                    expandRows={true}
                    fixedWeekCount={false}
                    displayEventEnd={true}
                    nowIndicator={true}
                    editable={true}
                    droppable={true}
                    selectable={true}
                    selectMirror={true}
                    selectOverlap={true}
                />
            </div >
        </div>
    )
}