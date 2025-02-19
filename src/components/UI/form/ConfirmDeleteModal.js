import React, { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { X } from 'lucide-react';

const ConfirmDeleteModal = ({ title, onConfirm }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="p-2 bg-red-500 text-white"
        onClick={() => setIsOpen(true)}
      >
        <X size={16} />
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4 bg-opacity-70 bg-black">
          <DialogPanel className="w-full max-w-md p-6 bg-white rounded">
            <DialogTitle className="text-lg font-medium leading-6 text-gray-900">
              {title}
            </DialogTitle>
            <div className="mt-2">
              <p>Are you sure you want to proceed?</p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded"
                onClick={() => setIsOpen(false)}
              >
                No
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-green-500 text-white rounded"
                onClick={onConfirm}
              >
                Yes
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default ConfirmDeleteModal;
