"use client"
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getDietDetailByDietId } from '@/lib/api/DietDetailAPI';
import ConfirmationDialog from './comfirm';
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { DataTable } from '../component/data-table';
import DataTableSkeleton from '@/app/dashboard/components/DataTableSkeleton';
import { columns } from '../component/columns';

interface Event {
    title: string;
    startTime: Date;
    allDay: boolean;
    id: number;
    daysOfWeek: number[]
}
interface DietDetail {
    id: number,
    name: string,
    description: string,
    createAt: Date,
    updateAt: Date,
    scheduleAt: Date,
    endAt: Date,
    feedingDateArray: string[],
    feedingTime: Date,
    quantity: number,
    status: boolean,
    FoodId: number
}

export default function DietDetailViewPage() {
    const [dietDetails, setDietDetails] = useState<DietDetail[]>([])
    const { dietId } = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()
    const calendarRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const initialize = async () => {
            try {
                const res = await getDietDetailByDietId(+dietId);
                const { data } = res;
                if (data == null) return
                setDietDetails(data);
            } catch (err: any) {
                setError(`Error initializing the app: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        };
        initialize();
    }, [dietId])

    const handleNavigation = () => {
        setIsDialogOpen(true);
    };

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleNavigate = () => {
        setIsDialogOpen(true);
    };

    const handleConfirm = () => {
        setIsDialogOpen(false);
        router.push(`/dashboard/diets/1/edit`);
    };

    const handleCancel = () => {
        setIsDialogOpen(false);
    };

    const events = dietDetails.map((dietDetail: DietDetail) => (
        {
            id: dietDetail.id,
            title: dietDetail.name,
            startTime: dietDetail.scheduleAt,
        }
    ))

    return (
        <div>
            <Tabs defaultValue="List" className="w-full">
                <TabsList className="grid w-[400px] grid-cols-2 ml-auto">
                    <TabsTrigger value="Calendar">Calendar</TabsTrigger>
                    <TabsTrigger value="List">List</TabsTrigger>
                </TabsList>
                <TabsContent value="Calendar">
                    <Card>
                        <CardContent className="">
                            <div className="hidden flex-col md:flex w-full py-5">
                                <FullCalendar
                                    plugins={[
                                        dayGridPlugin,
                                        interactionPlugin,
                                        timeGridPlugin
                                    ]}
                                    headerToolbar={{
                                        left: 'prev,next today',
                                        center: 'title',
                                        right: 'dayGridMonth,timeGridWeek'
                                    }}
                                    events={[
                                        events
                                    ]}
                                    eventClick={(info) => {
                                        handleNavigate();
                                    }}
                                    aspectRatio={2.5}
                                    slotMinTime={'04:00:00'}
                                    slotMaxTime={'22:00:00'}
                                    expandRows={true}
                                    fixedWeekCount={false}
                                    displayEventEnd={true}
                                    nowIndicator={true}
                                    editable={false}
                                    droppable={true}
                                    selectable={false}
                                    selectMirror={false}
                                    selectOverlap={true}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="List">
                    <Card>
                        <CardContent className="space-y-2">
                            <div className="hidden flex-col md:flex w-full py-5">

                                <div className="flex-1 space-y-4">
                                    {
                                        isLoading ? (
                                            <DataTableSkeleton />
                                        ) : (
                                            <DataTable columns={columns} data={dietDetails} />
                                        )
                                    }
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            <ConfirmationDialog isOpen={isDialogOpen}
                message="Are you sure you want to navigate away?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}></ConfirmationDialog>
        </div>
    )
}