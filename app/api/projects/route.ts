import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { SafeProject } from "@/app/types";

export async function POST(request: Request){
    
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const{
        title,
        description, 
        imageSrc,
        category,
        location,
        difficulty,
    } = body;

    Object.keys(body).forEach((value:any) => {
        if(!body[value]){
            NextResponse.error();
        }
    })


    const project = await prisma.project.create({
        data:{
            title,
            description,
            imageSrc,
            category,
            locationValue: location.value,
            difficulty,
            creatorId: currentUser.id
        }

    })

    const updatedProjectIds = [...currentUser.projectIds, project.id]

    prisma.user.update({
        where: {id: currentUser.id},
        data: updatedProjectIds
    })


    return NextResponse.json(project)

}

export async function PUT(request :Request){

    console.log("Request")
    console.log(request)

    const body = await request.json();

    const{
        title,
        description, 
        imageSrc,
        category,
        location,
        difficulty,
        memberIds,
        id
    } = body;
    
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    console.log("Member Ids array: " + memberIds)
    console.log("Project title: " + title)


    if (!memberIds.includes(currentUser.id)){
      
        const updatedMemberIds = [...memberIds, currentUser.id]

        const updatedProject = await prisma.project.update({
        where: {id: id},
        data: {
            memberIds: updatedMemberIds
        }
        })

        const updatedProjectIds = [...currentUser.projectIds, id]

        prisma.user.update({
            where: {id: currentUser.id},
            data: updatedProjectIds
        })

        return NextResponse.json(updatedProject)

    }

    return NextResponse.json({error: "Already Joined"})
}
