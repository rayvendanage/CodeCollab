// Not a Route , Direct communicatiosn from server componet to database 

import prisma from "@/app/libs/prismadb";

type IParams = {
    projectId?: string;
}

export default async function getProjectById(params: IParams){
    try{
        const {projectId} = params;

        const project = await prisma.project.findUnique({
            where: { id: projectId },
            include: { members: true }
        })

        if (!project){
            return null;
        }

        return {
            ...project,
            createdAt: project.createdAt.toISOString(),
            members: {
                ...project.members,
            }
        }

    } catch(error:any){
        throw new Error(error)
    }
}