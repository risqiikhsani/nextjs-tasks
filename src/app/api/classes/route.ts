import { auth } from "@/auth"
import { createErrorResponse } from "@/lib/actions"
import prisma from "@/lib/prisma"

export async function GET(){
    console.log("== Running Get Class ==")
    const response = await prisma.class.findMany({
        include:{
            creator:true
        },
        omit:{
            password:true
        }
    })
    return Response.json(response)
}

export async function POST(req:Request){
    console.log("== Running Post Class ==")

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
    const password = formData.get("password")?.toString()

    if(!name || !description){
        return Response.json("")
    }

    try {
        await prisma.class.create({
            data:{
                name:name,
                description:description,
                password:password,
                creatorId:user.id
            }
        })
    
        return Response.json("Created")
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error: ", error.stack);
          }
    }
}