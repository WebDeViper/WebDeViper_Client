import React, { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
}

interface Props extends HeaderProps {
  children: React.ReactNode;
  show: boolean;
  header?: boolean;
}

export default function Modal({ children, show, onClose, header, title }: Props) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden bg-white text-left shadow-xl transition-all rounded-md w-fit">
                {header && <Header onClose={onClose} title={title} />}
                <div className="p-5">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function Header({ onClose, title }: HeaderProps) {
  return (
    <div className="flex border-b justify-between gap-5 p-5">
      <div>
        <span className="font-semibold text-xl">{title}</span>
      </div>
      <button onClick={() => onClose(false)} className="text-gray-300">
        <XMarkIcon className="h-6 w-6" />
      </button>
    </div>
  );
}
