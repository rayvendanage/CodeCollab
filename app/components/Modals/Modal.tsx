'use client';

//A Modal is a box that disrupts a page by overlaying on top 

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from 'react-icons/io'
import Button from "../Button";

type ModelProps = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string
}

const Modal = ({
    children,
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel
}: ModelProps) =>{
    
    const [showModal, setShowModal] = useState(isOpen)
   
    //UseEffect is saying we want to do something everytime something on page changes
    //First param is a function, the second is an array of values that when changed will trigger the function
    //When the value changes you want to do something 
    //You can also add event listeners in the function that will make it run
    useEffect(() => {
        setShowModal(isOpen)
    }, [isOpen])

    const handleClose = useCallback(() => {
        if (disabled){
            return;
        }

        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [disabled, onClose])

    const handleSubmit = useCallback(() => {
        if(disabled){
            return;
        }
        onSubmit()
        
    }, [disabled, onSubmit])

    const handleSecondaryAction = useCallback(() => {
        if(disabled || !secondaryAction){
            return;
        }
        secondaryAction();
    }, [disabled, secondaryAction])

    if (!isOpen){
        return null;
    }


    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
                <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
                    {/* CONTENT */}
                    <div className={`
                    translate 
                    duration-300 
                    h-full 
                    ${showModal ? 'translate y-0' : 'translate-y-full'}
                    ${showModal ? 'opacity-100' : 'opacity-0'}
                    `}>
                        <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/* HEADER */}
                            <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                                <button onClick={handleClose} className="p-1 border-0 hover:opacity-70 transition absolute left-9">
                                    <IoMdClose size={18}></IoMdClose>
                                </button>
                                <div className="text-lg font-semibold">
                                   {title}
                                </div>
                            </div>
                            {/* BODY */}
                            <div className="relative p-6 flex-auto ">
                                {body}
                            </div>
                            {/* FOOTER */}
                            <div className="flex flex-col gap-2 p-6 ">
                                <div className="flex flex-row items-center gap-4 w-full">
                                    {secondaryAction && secondaryActionLabel && (
                                        <Button disabled={disabled} label={secondaryActionLabel} onClick={handleSecondaryAction}>
                                        </Button>
                                    )}
                                    <Button disabled={disabled} label={actionLabel} onClick={handleSubmit}>
                                    </Button>
                                </div>
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        

    )
}

export default Modal;