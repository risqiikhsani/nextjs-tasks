import { auth } from "@/auth"
import { createErrorResponse } from "@/lib/actions"
import prisma from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest){
    console.log("== Running Get Enrollments ==")

    const searchParams = req.nextUrl.searchParams
    const class_id = searchParams.get('class_id')

    if(!class_id){
        return createErrorResponse('Class ID not found')
    }

    const response = await prisma.classEnrollment.findMany({
        where:{
            classId: parseInt(class_id)
        },
    })

    return Response.json(response)
}

export async function POST(req: NextRequest) {
    console.log("== Running Create Enrollment ==");

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
  
    const formData = await req.formData();
    const password = formData.get("password");

    const existing_class = await prisma.class.findUnique({
      where: {
        id: parseInt(class_id),
      }
    });

    if(existing_class?.password){
        if(existing_class.password !== password){
            return createErrorResponse('Wrong Password')
        }
    }

    try {
        await prisma.classEnrollment.create({
            data:{
                userId:user.id,
                classId:parseInt(class_id)
            }
        })
    
        return Response.json("Created")
    } catch (error) {
        console.error(error)
    }
}