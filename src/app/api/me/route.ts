import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){
    const session = await auth()
    const user = session?.user
    if(!user){
        return Response.json("Not logged in")
    }

    const data = await prisma.user.findUnique({
        where:{
            email:user.email
        }
    })
    return Response.json(data)
}