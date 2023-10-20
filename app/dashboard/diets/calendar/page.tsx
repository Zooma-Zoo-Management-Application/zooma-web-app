
"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'


function DietCalendar() {
    return (
        <div className='w-full p-10'>
            {<FullCalendar

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
            // dateClick={handleDateClick}
            // drop={(data) => addEvent(data)}
            // eventClick={(data) => handleDeleteModal(data)}
            />}

        </div>
    )
}
export default DietCalendar