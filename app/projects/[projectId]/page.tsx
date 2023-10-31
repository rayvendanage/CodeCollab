import getCurrentUser from "@/app/actions/getCurrentUser";
import getProjectById from "@/app/actions/getProjectById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

import ProjectClient from "./ProjectClient";
import getUserById from "@/app/actions/getUserById";

//In server components you cannot use hooks, you can only use 
//things that directly interact with the databse (actions)
//but we can still access parameters in server compoents 
//(so the paramaters in the url we can access by passing in params IParams
//the cleint side components we indicate as "use client" can use hooks 

type IParams = {
    projectId?: string;
}


const ProjectPage = async ( {params} : {params: IParams} ) => {
    
    const project = await getProjectById(params);
    const currentUser = await getCurrentUser();
    const projectCreator = await getUserById(project?.creatorId)



    if(!project){
        return(
            <ClientOnly>
                <EmptyState></EmptyState>
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <ProjectClient
                project = {project}
                currentUser={currentUser}
                projectCreator={projectCreator}
            >
            </ProjectClient>
        </ClientOnly>
    )
}

export default ProjectPage;