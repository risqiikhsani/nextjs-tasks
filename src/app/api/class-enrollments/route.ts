import { auth } from "@/auth"
import { createErrorResponse } from "@/lib/actions"
import logger from "@/lib/logger"
import prisma from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    logger.info("== Get Enrollments ==")
    const searchParams = req.nextUrl.searchParams
    const class_id = searchParams.get('class_id')
    const user_id = searchParams.get('user_id')
  
    // Build the where clause based on provided parameters
    const whereClause: any = {}
  
    if (class_id) {
      whereClause.classId = parseInt(class_id)
    }
  
    if (user_id) {
      whereClause.userId = user_id
    }
  
    // If neither parameter is provided, return error
    if (Object.keys(whereClause).length === 0) {
      return createErrorResponse('Class ID or User ID not found')
    }
  
    try {
      const response = await prisma.classEnrollment.findMany({
        where: whereClause,
        include:{
            user:true,
            class:true
        }
      })
  
      return Response.json(response)
    } catch (error) {
      logger.error('Error fetching enrollments:', error)
      return createErrorResponse('Failed to fetch enrollments')
    }
  }
export async function POST(req: NextRequest) {
    logger.info("== Create Enrollment ==");

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
        logger.error(error)
    }
}