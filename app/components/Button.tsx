'use client';

import { IconType } from "react-icons";

type ButtonProps = {
    children: React.ReactNode
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
}

const Button = ({children, label, onClick, disabled, outline, small, icon: Icon}: ButtonProps) => {
    return(
        <button onClick={onClick} disabled={disabled}
            className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full
            ${outline? "bg-white" : "bg-blue-400"}
            ${outline? "border-black" : "border-blue-400"}
            ${outline? "text-black" : "text-white"}
            ${small? "py-1" : "py-3"}
            ${small? "font-light" : "font-semibold"}
            ${small? "text-sm" : "text-md"}
            ${small? "border-[1px]" : "border-2"}
        `}>
            {Icon && (
                <Icon size={24} className="absolute left-4 top-3">
                </Icon>
            )}
            {label}
        </button>
    )

}

export default Button;