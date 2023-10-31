import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NormalizeError } from "next/dist/shared/lib/utils";

type Iparams = {
    projectId?: string;
}

export async function POST(request: Request, {params}: {params: Iparams}){

    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error()
    }

    const {projectId} = params

    if(!projectId || typeof projectId != "string"){
        throw new Error("Invalid ID");
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])]

    favoriteIds.push(projectId)

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {favoriteIds: favoriteIds}
    });

    return NextResponse.json(user);
}

export async function DELETE(reqest:Request,{params}: {params: Iparams} ){
    
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    const {projectId} = params

    if(!projectId || typeof projectId != "string"){
        throw new Error("Invalid ID");
    }
    
    let favoriteIds = [...(currentUser.favoriteIds || [])]

    favoriteIds = favoriteIds.filter((id) => id != projectId)

    const user = await prisma.user.update({
        where: {id: currentUser.id},
        data: {favoriteIds: favoriteIds}

    })

    return NextResponse.json(user);
}