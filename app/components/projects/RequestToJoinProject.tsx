"use client";

import Button from "../Button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SafeProject, SafeUser} from "@/app/types";
import { ProjectUser } from "@prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { useState, useCallback } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";


type RequestToJoinProjectProps = {
    children: React.ReactNode;
    project: SafeProject & {
        members: ProjectUser[];
    };
    currentUser?: SafeUser | null;
    projectCreator: SafeUser | null;
}

const RequestToJoinProject = ({ children, project, currentUser, projectCreator}: RequestToJoinProjectProps) => {

    const router = useRouter();
    
    const loginModal = useLoginModal();
    const [isOpen, setIsOpen] = useState(false); //Setting the state of the menu 

    const joinProject = useCallback(() =>{
        //setIsLoading(true);
        console.log("Project")
        console.log(project)
        console.log(project.memberIds)

        if(!currentUser) {
            return loginModal.onOpen();

        }

        axios.put("/api/projects", project)
        .then(() =>  {
            toast.success("Project Joined!")
            router.refresh();
        })
        .catch(() => {
            toast.error("Something went wrong")
        }).finally(() =>{
            //setIsLoading(false)
        })
    }, [loginModal, currentUser])

    const isMember = () => {
        if(currentUser){
            if (project.memberIds.includes(currentUser.id)){
                return true;
            }
            if (projectCreator?.id == currentUser?.id){
                return true;
            }
        }else{
            return false;
        }
    }

    //if you are already joined set up a feature where you can unjoin a project
 
    return (
        <div>
            <Button
                label="Join Project"
                onClick={() => joinProject()}
                disabled={isMember()}
               >

            </Button>

        </div>
    )
}

export default RequestToJoinProject;