import prisma from "@/lib/prisma";


export async function GET(request: Request) {
    const result = await prisma.profesi.findMany({
        include: {
            _count: {
                select: {
                    hasil_response: true
                }
            }
        }
    })
    return Response.json(result)
}
