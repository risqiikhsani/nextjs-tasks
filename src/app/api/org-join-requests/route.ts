import { auth } from "@/auth"
import { createErrorResponse } from "@/lib/actions"
import logger from "@/lib/logger"
import prisma from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    logger.info("== Get Join Requests ==")
    const searchParams = req.nextUrl.searchParams
    const organization_id = searchParams.get('organization_id')
    const user_id = searchParams.get('user_id')
  
    // Build the where clause based on provided parameters
    const whereClause: any = {}
  
    if (organization_id) {
      whereClause.orgId = organization_id
    }
  
    if (user_id) {
      whereClause.userId = user_id
    }
  
    // If neither parameter is provided, return error
    if (Object.keys(whereClause).length === 0) {
      return createErrorResponse('Class ID or User ID not found')
    }
  
    try {
      const response = await prisma.joinRequest.findMany({
        where: whereClause,
        include:{
            user:true,
            org:true
        }
      })
  
      return Response.json(response)
    } catch (error) {
      logger.error('Error fetching Join Requests:', error)
      return createErrorResponse('Failed to fetch Join Requests')
    }
  }

export async function POST(req: NextRequest) {
    logger.info("== Create Join Requests ==");

    const searchParams = req.nextUrl.searchParams
    const organization_id = searchParams.get('organization_id')

    const formData = await req.formData();
    const message = formData.get("message")?.toString();

    if(!organization_id){
        return createErrorResponse('Organization ID not found')
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

    try {
        await prisma.joinRequest.create({
            data:{
                userId:user.id,
                orgId:organization_id,
                message:message
            }
        })
    
        return Response.json("Created")
    } catch (error) {
        logger.error(error)
        return createErrorResponse('Failed to create request, or you have already made request.',500)
    }
}