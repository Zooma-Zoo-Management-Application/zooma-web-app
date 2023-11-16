'use client'

import { Pencil, Trash2, X } from "lucide-react";
import { Diet } from "../data/schema";
import { format } from "date-fns";
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
    foodId: number,
    food: {
        name: string,
        imageUrl: string,
    }
}
interface ConfirmationDialogProps {
    isOpen: boolean;
    onEdit: () => void;
    onDelete: () => void;
    onCancel: () => void;
    message?: DietDetail;
}

const dates = [
    { id: "0", label: "Sun", },
    { id: "1", label: "Mon", },
    { id: "2", label: "Tue", },
    { id: "3", label: "Wed", },
    { id: "4", label: "Thu", },
    { id: "5", label: "Fri", },
    { id: "6", label: "Sat", },
    { id: "7", label: "Everyday" }
] as const

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onEdit, onDelete, onCancel, message }) => {
    const detail = message
    const handleDateRow = (feedingDateArray: string[]) => {
        let str = "";
        feedingDateArray?.map((date: string) => {
            if (dates.find((date1) => date1.id === date)) {
                str += (dates.find((date1) => date1.id === date)?.label) + ". "
            }
        })
        if (str === "Sun. Mon. Tue. Wed. Thu. Fri. Sat. ") return dates.at(7)?.label
        return str
    }

    return (
        <>
            <div className={`backdrop-blur-sm fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
                <div className="bg-white-500 p-4 rounded-lg shadow-lg w-[max]-400px">
                    <div className="text-center flex justify-end">
                        <span className="text-3xl mb-4 font-bold mr-20">
                            {(message != null) ? (message?.name) : ("ERROR")}
                        </span>
                        {(message != null) ? (
                            <>
                                <X className="cursor-pointer to-black-500 my-2 ml-12 mr-2 border-black-500 border-2" onClick={onCancel} /></>
                        ) : (
                            <><X className="cursor-pointer to-black-500 m-2  border-black-500 border-2" onClick={onCancel} /></>
                        )}
                    </div>
                    {(message != null) ?
                        (<span className="text-lg mb-8">
                            <span className="font-semibold">Schedule at:</span> {format(new Date(message.scheduleAt.toString()), "MMM dd, yyyy")} <br />
                            <span className="font-semibold">End at:</span> {format(new Date(message.endAt.toString()), "MMM dd, yyyy")}
                            <br />
                            <span className="font-semibold">Feeding at:</span> {message.feedingTime.toString().substring(0, 5)},&emsp; {handleDateRow(message?.feedingDateArray)} <br />
                            <span className="font-semibold">Food:</span> {message?.quantity}kg {message.food.name}
                        </span>) : (
                            <span className="text-lg mb-8">
                                No results
                            </span>
                        )
                    }

                </div>
            </div>
        </>
    );
};

export default ConfirmationDialog;