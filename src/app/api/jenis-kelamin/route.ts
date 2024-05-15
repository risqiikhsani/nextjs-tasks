import prisma from "@/lib/prisma";


export async function GET(request: Request) {
    const result = await prisma.jenisKelamin.findMany()
    return Response.json(result)
}
