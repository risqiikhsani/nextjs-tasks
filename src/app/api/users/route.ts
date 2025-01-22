import logger from "@/lib/logger"
import prisma from "@/lib/prisma"



export async function GET(req:Request) {
    logger.info("== Get Users ==")
    const response = await prisma.user.findMany()

    return Response.json(response)
}