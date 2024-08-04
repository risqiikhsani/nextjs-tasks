import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";


export async function GET(request: Request) {
    const result = await prisma.post.findMany({
        include: {
            author:true
        }
    })
    return Response.json(result)
}


export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    console.log("session is ",session);
    
    if (!session || !session.user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email as string },
    });

    if (!user) {
        return new Response("User not found", { status: 404 });
    }

    
    const body = await request.json();
    const { name, detail, image,price,category } = body;

    if (!name) {
        return new Response("Please provide both name", { status: 400 });
    }

    const authorId = user.id;

    try {
        const newPost = await prisma.post.create({
            data: {
                name,
                detail,
                image,
                price,
                category,
                // authorId,
                author: { connect: { id: authorId } },
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