"use client";

import { SafeUser, SafeProject } from "@/app/types";
import { Project, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import Image from "next/image";

import useCountries from "@/app/hooks/useCountries";
import HeartButton from "../HeartButton";
import Button from "../Button";

type ProjectCardProps = {
    children?: React.ReactNode;
    currentUser: SafeUser | null; // using safe user which we created because we are using non sanatized data such as dates in our database 
    data: SafeProject;
    onAction?: (id: string) => void;
    actionLabel?: string;
    actionId?: string;
    isMember?: boolean;
    disabled?: boolean
    isOwner?: boolean

}

const ProjectCard = ({children, currentUser, data, onAction, actionLabel, actionId = "", isMember, disabled, isOwner} : ProjectCardProps) => {
   
    const router = useRouter();
    const {getByValue} = useCountries();

    const location = getByValue(data.locationValue);

    const handleCancel = useCallback(
        (e:React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if(disabled){
                return;
            }

            onAction?.(actionId);
        }, [onAction, actionId, disabled]
    )


    return (
        <div 
            className="col-span-1 cursor-pointer group"
            onClick={() => router.push(`/projects/${data.id}`)}>
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image 
                        className="object-cover h-full w-full group-hover:scale-110 transition"
                        alt="Project"
                        src={data.imageSrc}
                        fill
                        >

                    </Image>
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            projectId={data.id}
                            currentUser={currentUser}>

                        </HeartButton>
                    </div>

                </div>
                <div className="font-semibold text-lg">
                    {data.title}
                </div>
                <div className="font-light text-neutral-500">
                    {data.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        Difficulty Level : {data.difficulty}
                    </div>
                    {!isMember && (
                        <div className = "font-light">

                        </div>

                    )}
                </div>
                {onAction && actionLabel && (
                    <Button
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={() => onAction(data.id)}>
                    </Button>
                )}
            </div>
        </div>
    )
}

export default ProjectCard;