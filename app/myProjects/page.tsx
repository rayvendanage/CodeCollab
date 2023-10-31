import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getAllProjects from "@/app/actions/getAllProjects";
import getProjectById from "@/app/actions/getProjectById";
import MyProjectsClient from "./MyProjectsClient";
import { SafeProject } from "../types";


const MyProjectsPage = async () => {
    
    const currentUser = await getCurrentUser();
    const projects = await getAllProjects();

    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please login">
                </EmptyState>
            </ClientOnly>
        )
    }

    let myProjects: SafeProject[]
    myProjects = []

    projects.forEach(function (project, index){
        if(project.memberIds.includes(currentUser.id)){
            myProjects = [...myProjects, project]
        }
    })

    //const myProjects = currentUser.projectIds.map(async (projectId) =>{
    //   await getProjectById({projectId})
   // })



    if(myProjects.length == 0){
        return(
            <ClientOnly>
                <EmptyState
                    title="No projects found"
                    subtitle="Looks like you haven't joined any projects.">
                </EmptyState>
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <MyProjectsClient
                myProjects={myProjects}
                currentUser={currentUser}>
            </MyProjectsClient>
        </ClientOnly>
    )
}

export default MyProjectsPage