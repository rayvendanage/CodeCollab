"use client";

import getUserById from "@/app/actions/getUserById";
import useContries from "@/app/hooks/useCountries";
import ProjectCategory from "./ProjectCategory";
import { SafeUser } from "@/app/types";
import { ProjectUser } from "@prisma/client";
import { IconType } from "react-icons";
import { FaAviato } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";

type ProjectInfoProps = {
    children?: React.ReactNode;
    members: ProjectUser[];
    creatorId: string;
    category:{
        icon: IconType;
        label: string;
        description: string;
    } | undefined;
    description: string;
    difficulty: number;
    locationValue: string;
    projectCreator: SafeUser | null;

}

const ProjectInfo = ({children, members, creatorId, category, description, difficulty, locationValue, projectCreator} : ProjectInfoProps) => {

    const {getByValue} = useContries();

    const coordinates = getByValue(locationValue)?.latlng;
    

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    {/* Profile Image */}
                    <div>Created by {projectCreator?.name}</div>
                </div>
                <div>
                    <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                        <div>
                            Difficulty: {difficulty}
                        </div>
                    </div>
                </div>
            </div>
            <hr></hr>
            {category && (
                <ProjectCategory
                    icon={category.icon}
                    label={category.label}
                    description={category.description}>
                </ProjectCategory>
            )}
            <hr></hr>
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr></hr>
            

        </div>
    )

}

export default ProjectInfo;