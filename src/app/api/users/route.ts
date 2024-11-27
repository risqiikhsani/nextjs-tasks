import prisma from "@/lib/prisma"

export async function GET(req:Request) {
    const response = await prisma.user.findMany()

    return Response.json(response)
}