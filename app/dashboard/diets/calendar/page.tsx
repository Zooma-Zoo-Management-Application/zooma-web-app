"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import {
    Dialog, DialogContent, DialogDescription, DialogFooter,
    DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DatePicker } from './Components/datePicker'
import { FoodSelect } from './Components/FoodSelector'
import { Textarea } from '@/components/ui/textarea'


interface Event {
    title: string;
    start: Date | string;
    allDay: boolean;
    id: number;

}

export default function Home() {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <div className="w-full" >
            <div className='flex justify-end w-full'>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Add meal</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[900px]">
                        <DialogHeader>
                            <DialogTitle>Add a new meal</DialogTitle>
                            <DialogDescription>
                                Add a new meal to diet. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-8 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input id="name" value="Lunch" className="col-span-7" />
                            </div>
                            <div className="grid grid-cols-8 items-center gap-4">
                                <Label htmlFor="ScheduleAt" className="text-right">
                                    Schedule Date
                                </Label>
                                {/* <Input id="scheduleAt" value="@peduarte" className="col-span-3" /> */}
                                <DatePicker></DatePicker>
                            </div>
                            <div className="grid grid-cols-8 items-center gap-4">
                                <Label htmlFor="endAt" className="text-right">
                                    End Date
                                </Label>
                                {/* <Input id="endAt" value="@peduarte" className="col-span-3" /> */}
                                <DatePicker></DatePicker>
                            </div>
                            <div className="grid grid-cols-8 items-center gap-4">
                                <Label htmlFor="feedingInterval" className="text-right">
                                    Interval
                                </Label>
                                <Input id="feedingInterval" value="1" className="col-span-3" />
                                <Label className="text-left font-normal"> days</Label>
                            </div>
                            <div className="grid grid-cols-8 items-center gap-4">
                                <Label htmlFor="food" className="text-right">
                                    food
                                </Label>
                                {/* <Input id="food" value="1" className="col-span-3" /> */}
                                <FoodSelect />
                            </div>
                            <div className="grid grid-cols-8 items-center gap-4">
                                <Label htmlFor="name" className="text-right align-text-top">
                                    Description
                                </Label>
                                <Textarea id="name" placeholder="describe the meal in details" className="col-span-7" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="w-full p-5">
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
                    aspectRatio={2.5}
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
            </div>
        </div>

    )
}