import prisma from "@/app/libs/prismadb";


export default async function getAllProjects(){
    try{


        const projects = await prisma.project.findMany({
            orderBy:{
                createdAt: "desc"
            }
        })

        const safeProjects = projects.map((project) => ({
            ...project,
            createdAt: project.createdAt.toISOString()
        }));

        return safeProjects;

    }catch(error: any){
        throw new Error(error)
    }
}