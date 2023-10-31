import prisma from "@/app/libs/prismadb";

export type IProjectsParams = {
    locationValue?: string;
    category?: string;
    difficulty?: number;
}


export default async function getProjects(params: IProjectsParams){
    try{

        const {
            locationValue,
            category,
            difficulty
        } = params;

        let query: any = {};

        if(category){
            query.category = category;
        }

        if(difficulty){
            query.difficulty = {
                gte: +difficulty
            }
        }

        if(locationValue){
            query.locationValue = locationValue;
        }

        const projects = await prisma.project.findMany({
            where: query,
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