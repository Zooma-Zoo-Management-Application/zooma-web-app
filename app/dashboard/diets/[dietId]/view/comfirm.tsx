import { useState } from 'react';

interface ConfirmationDialogProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    message: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onConfirm, onCancel, message }) => {
    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <p className="text-lg mb-4">{message}</p>
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