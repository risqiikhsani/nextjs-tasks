import { auth } from "@/auth";
import logger from "@/lib/logger";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){
    logger.info("== Get Me ==")
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