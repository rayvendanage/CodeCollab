"use client";

import { IconType } from "react-icons";

type CategoryInputProps = {
    children: React.ReactNode;
    label: string;
    icon: IconType;
    selected?: boolean;
    onClick: (value: string) => void;
}

const CategoryInput = ({label, icon:Icon, selected, onClick} : CategoryInputProps) => {

    return (
        <div
            onClick={() => onClick(label)} //passes category label back to parenet component (Create Project Modal)
            className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer items-center
            ${selected ? "border-black" : "border-neutral-200"}`}>

            <Icon size={30}></Icon>
            <div className="font-semibold">
                {label}
            </div>
    
        </div>
    )

}

export default CategoryInput;