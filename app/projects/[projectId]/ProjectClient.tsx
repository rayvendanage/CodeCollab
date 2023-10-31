"use client";

import { useMemo } from "react";

import { categories } from "@/app/components/navbar/Categories";
import { SafeProject, SafeUser } from "@/app/types";
import { Project, ProjectUser } from "@prisma/client";
import Container from "@/app/components/Container";
import ProjectHead from "@/app/components/projects/ProjectHead";
import ProjectInfo from "@/app/components/projects/ProjectInfo";
import RequestToJoinProject from "@/app/components/projects/RequestToJoinProject";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
}

type ProjectClientProps = {
    children?: React.ReactNode;
    project: SafeProject & {
        members: ProjectUser[];
    };
    currentUser?: SafeUser | null;
    projectCreator: SafeUser | null;
}


const ProjectClient = ({ children, project, currentUser, projectCreator} : ProjectClientProps) => {

    const category = useMemo(() => {
        return categories.find((item) => 
            item.label === project.category
        )
    }, [project.category])
    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ProjectHead
                        title={project.title}
                        imageSrc={project.imageSrc}
                        locationValue={project.locationValue}
                        id={project.id}
                        currentUser={currentUser}>
                    </ProjectHead>
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10
                    mt-6">
                        <ProjectInfo
                            members={project.members}
                            creatorId={project.creatorId}
                            category={category}
                            description={project.description}
                            difficulty={project.difficulty}
                            locationValue= {project.locationValue}
                            projectCreator= {projectCreator}>
                        </ProjectInfo>
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <RequestToJoinProject 
                                project={project}
                                currentUser={currentUser}
                                projectCreator={projectCreator}>

                            </RequestToJoinProject>

                        </div>
                    </div>
                </div>
            </div>

        </Container>
    )
}

export default ProjectClient;