// Not a Route , Direct communicatiosn from server componet to database 

import prisma from "@/app/libs/prismadb";

type IParams = {
    userId?: string;
}

type getUserByIdParams = {
    userId?: string;
}

export default async function getUserById(userId: string | undefined){
    try{
        //const {userId} = params;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { accounts: true, projects: true }
        })

        if (!user){
            return null;
        }

        return {
            ...user,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
            emailVerified: user.emailVerified?.toISOString() || null,
            accounts: {
                ...user.accounts,
            },
            projects: {
                ...user.projects,
            }
        }

    } catch(error:any){
        throw new Error(error)
    }
}