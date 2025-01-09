import { auth } from "@/auth"
import { createErrorResponse } from "@/lib/actions"
import prisma from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest){
    console.log("== Running Get Courses ==")

    const searchParams = req.nextUrl.searchParams
    const class_id = searchParams.get('class_id')

    if(!class_id){
        return createErrorResponse('Class ID not found')
    }

    const response = await prisma.course.findMany({
        where:{
            classId: parseInt(class_id)
        },
        include:{
            creator:true
        }
    })

    return Response.json(response)
}

export async function POST(req:NextRequest){
    console.log("== Running Post Course ==")

    const searchParams = req.nextUrl.searchParams
    const class_id = searchParams.get('class_id')

    if(!class_id){
        return createErrorResponse('Class ID not found')
    }

    const session = await auth()
    if(!session){
        return createErrorResponse('Not Authenticated')
    }
    const user = await prisma.user.findUnique({
        where:{
            email:session.user.email
        }
    })

    if(!user){
        return createErrorResponse('User not found')
    }

    const formData = await req.formData()
    const name = formData.get("name")?.toString()
    const description = formData.get("description")?.toString()

    if(!name || !description){
        return Response.json("")
    }

    try {
        await prisma.course.create({
            data:{
                name:name,
                description:description,
                creatorId:user.id,
                classId: parseInt(class_id)
            }
        })
    
        return Response.json("Created")
    } catch (error) {
        console.log("Error post course: ", error)
        console.error(error)
    }
}