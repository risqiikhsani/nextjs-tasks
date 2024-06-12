import prisma from "@/lib/prisma";


export async function GET(request: Request) {
    const result = await prisma.post.findMany({
        // include: {
        //     _count: {
        //         select: {
        //             hasil_response: true
        //         }
        //     }
        // }
    })
    return Response.json(result)
}


export async function POST(request: Request) {
    const body = await request.json();
    const { title, text } = body;

    if (!title || !text) {
        return new Response("Please provide both title and text", { status: 400 });
    }

    try {
        const newPost = await prisma.post.create({
            data: {
                title,
                text,
            },
        });

        return new Response(JSON.stringify(newPost), {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error creating post:", error);
        return new Response("Error creating post", { status: 500 });
    }
}