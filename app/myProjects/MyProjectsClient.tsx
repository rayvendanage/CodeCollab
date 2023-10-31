"use client";

import axios from "axios";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeProject, SafeUser } from "../types";

import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import ProjectCard from "../components/projects/ProjectCard";

type MyProjectsClientProps = {
    children: React.ReactNode;
    myProjects: SafeProject[] | null;
    currentUser: SafeUser;
}

const MyProjectsClient = ({children, myProjects, currentUser} : MyProjectsClientProps) => {
    
    const router = useRouter();

    const [deletingId, setDeletingId] = useState("");

    const onRemove = useCallback((id:string) => {
        setDeletingId(id);

        axios.post("/api/myProjects/${id}")
        .then(() => {
            toast.success("Removed from project")
            router.refresh()
        })
        .catch((error) => {
            toast.error(error?.response?.data?.error)
        })
        .finally(() => {
            setDeletingId('');
        })
    }, [router])

    return (
        <Container>
            <Heading
             title="My Projects"
             subtitle="All the projects you created and joined!">
            </Heading>
            <div className="mt-10 grid gris-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {myProjects?.map((project) => (
                    <ProjectCard
                        key={project.id}
                        data={project}
                        currentUser={currentUser}
                        actionId={project.id + currentUser.id}
                        onAction={onRemove}
                        disabled={project.creatorId == currentUser.id}
                        actionLabel="Drop Project"
                        isOwner={project.creatorId == currentUser.id}>

                    </ProjectCard>

                ))}
            </div>

        </Container>
    )
    }

    export default MyProjectsClient