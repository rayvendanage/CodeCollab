'use client';

import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { BiDollar } from "react-icons/bi";


type InputProps = {
    children?: React.ReactNode;
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    large: boolean
}


const Input = ({children, id, label, type, disabled, formatPrice, required, register, errors, large} : InputProps) => {

    return (
        <div className="w-full relative">
            {formatPrice && (
                <BiDollar size={24} className="text-neautral-700 absolute top-5 left-2">
                </BiDollar>
            )}
            {large && (
                <textarea
                id={id}
                disabled={disabled}
                {...register(id, {required})}
                placeholder = " "
                className = {`peer h-52 w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed focus:border-black
                ${formatPrice ? "pl-9" : "pl-4"}
                ${errors[id] ? "border-blue-400" : 'border-neutral-300'}
                ${errors[id] ? "focus:border-blue-400" : "focus:border-black-300"}
                `}
                >
                </textarea>
            )}
            {!large && (
                <input
                    id={id}
                    disabled={disabled}
                    {...register(id, {required})}
                    placeholder = " "
                    type = {type}
                    className = {`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed focus:border-black
                    ${formatPrice ? "pl-9" : "pl-4"}
                    ${errors[id] ? "border-blue-400" : 'border-neutral-300'}
                    ${errors[id] ? "focus:border-blue-400" : "focus:border-black-300"}
                    ${large ? "h-100": "h-auto"}
                    `}>
                </input>
            )}
            <label className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0]
                ${formatPrice ? "left-9" : "left-4"} 
                peer-placeholder-shown:scale-100 
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-7
                peer-focus:-translate-y-4
                ${errors[id] ? "text-blue-400" : "text-zinc-400" }
                `}>
                {label}
            </label>

        </div>
    )
}

export default Input;