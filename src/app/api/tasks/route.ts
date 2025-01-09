import { auth } from "@/auth"
import { createErrorResponse } from "@/lib/actions"
import prisma from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest){
    console.log("== Running Get Tasks ==")

    const searchParams = req.nextUrl.searchParams
    const course_id = searchParams.get('course_id')

    if(!course_id){
        return createErrorResponse('Course ID not found')
    }

    const response = await prisma.task.findMany({
        where:{
            courseId: parseInt(course_id)
        },
        include:{
            creator:true
        }
    })

    return Response.json(response)
}

export async function POST(req:NextRequest){
    console.log("== Running Post Task ==")

    const searchParams = req.nextUrl.searchParams
    const course_id = searchParams.get('course_id')

    if(!course_id){
        return createErrorResponse('Course ID not found')
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
        await prisma.task.create({
            data:{
                name:name,
                description:description,
                creatorId:user.id,
                courseId: parseInt(course_id)
            }
        })
    
        return Response.json("Created")
    } catch (error) {
        console.log("Error post task: ", error)
        console.error(error)
    }
}