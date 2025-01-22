import { auth } from "@/auth"
import { createErrorResponse } from "@/lib/actions"
import logger from "@/lib/logger"
import prisma from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    logger.info("== Get Org Members ==")
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
      const response = await prisma.organizationMember.findMany({
        where: whereClause,
        include:{
            user:true,
            org:true
        }
      })
  
      return Response.json(response)
    } catch (error) {
      logger.error('Error get org members:', error)
      return createErrorResponse('Failed to fetch OrganizationMembers')
    }
  }
export async function POST(req: NextRequest) {
    logger.info("== Create Org Members ==");

    const searchParams = req.nextUrl.searchParams
    const organization_id = searchParams.get('organization_id')

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
        await prisma.organizationMember.create({
            data:{
                userId:user.id,
                orgId:organization_id
            }
        })
    
        return Response.json("Created")
    } catch (error) {
        logger.error("error post org members :",error)
    }
}