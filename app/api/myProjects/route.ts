import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { SafeProject } from "@/app/types";
import getProjectById from "@/app/actions/getProjectById";

export async function PUT(request :Request){

    console.log("Request")
    console.log(request)

    const body = await request.json();

    const{
        id
    } = body;
    
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }



    const project = await getProjectById(id)

    if(project){
        const updatedMemberIds = project.memberIds.splice(project.memberIds.indexOf(currentUser.id), 1)

        const updatedProject = await prisma.project.update({
        where: {id: id},
        data: {
            memberIds: updatedMemberIds
        }
        })

        const updatedProjectIds = currentUser.projectIds.splice(currentUser.projectIds.indexOf(project.id))

        prisma.user.update({
            where: {id: currentUser.id},
            data: updatedProjectIds
        })

        return NextResponse.json(updatedProject)

    }

    return NextResponse.json({error: "No Project with that Id"})
}
