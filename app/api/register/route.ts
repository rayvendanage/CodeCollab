import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";

export async function POST(request: Request){
    const body = await request.json(); //recieve user data from register modal
    const{email, name, password} = body; //destructure fields from body

    const hashedPassword = await bcrypt.hash(password, 12); //encrypt password

    const user = await prisma.user.create({
        data:{
            email,
            name,
            hashedPassword
        }
    }) //create new user in database 

    return NextResponse.json(user);
}