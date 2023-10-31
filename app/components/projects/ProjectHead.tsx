"use client"

import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import HeartButton from "../HeartButton";

import useCountries from "@/app/hooks/useCountries";
import Image from "next/image";

type ProjectHeadProps = {
    children?: React.ReactNode;
    title: string;
    imageSrc: string;
    locationValue: string;
    id: string;
    currentUser?: SafeUser | null;

}

const ProjectHead = ({children, title, imageSrc, locationValue, id, currentUser}: ProjectHeadProps) => {

    const {getByValue} = useCountries();

    const location = getByValue(locationValue);
    return (
        <>
        <Heading
            title={title}
            subtitle={`${location?.region}, ${location?.label}`}>

        </Heading>
        <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
            <Image
                className="object-cover w-full"
                alt="Image"
                src={imageSrc}
                fill>

            </Image>
            <div className="absolute top-5 right-5">
                <HeartButton
                    projectId={id}
                    currentUser={currentUser}>

                </HeartButton>

            </div>
        </div>
        </>
    )
}

export default ProjectHead;