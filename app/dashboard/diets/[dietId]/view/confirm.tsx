'use client'

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
    onConfirm: () => void;
    onCancel: () => void;
    message?: DietDetail;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onConfirm, onCancel, message }) => {
    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="bg-gray-500 p-4 rounded-lg shadow-md">
                <span className="text-3xl mb-8 font-bold">
                    {message?.name} <br />
                </span>
                <span className="text-lg mb-8">
                    {message?.food.name} <br />
                </span>

                <div className="text-center">
                    <button className="bg-green-500 text-white px-4 py-2 mr-2" onClick={onConfirm}>
                        Confirm
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;