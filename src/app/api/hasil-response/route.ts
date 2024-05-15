import prisma from "@/lib/prisma";


export async function GET(request: Request) {
    const result = await prisma.hasilResponse.findMany()
    return Response.json(result)
}

export async function POST(request: Request) {
    const res = await request.json()
    const result = await prisma.hasilResponse.create({
        data: {
            ...res
        },
    })
    return Response.json(result);
}