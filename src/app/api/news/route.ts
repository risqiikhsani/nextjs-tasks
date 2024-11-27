import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";

function jsonResponse(status: number, message: string, error?: string) {
    return new Response(JSON.stringify({ status, message, error }), {
        status,
        headers: { "Content-Type": "application/json" }
    });
}

export async function GET(request: Request) {


    try {
        const result = await prisma.news.findMany({
            include: {
                author: true
            }
        });
        console.log(result)
        return Response.json(result)
    } catch (error) {
        console.error("Error fetching news:", error);
        return jsonResponse(500, "Error fetching news", "Internal Server Error");
    }
}

export async function POST(request: Request) {

    // this session only detected if post was sent from client side page
    const session = await getServerSession(authOptions);
    console.log("Session name:", session?.user.name);

    if (!session || !session.user) {
        return jsonResponse(401, "Unauthorized");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email as string },
    });

    if (!user) {
        return jsonResponse(404, "User not found");
    }

    const body = await request.json();
    const { title, text, image } = body;

    if (!title) {
        return jsonResponse(400, "Please provide a title");
    }

    const authorId = user.id;

    try {
        const news = await prisma.news.create({
            data: {
                title,
                text,
                image,
                author: { connect: { id: authorId } },
            },
        });

        return Response.json(news);
    } catch (error) {
        console.error("Error creating:", error);
        return jsonResponse(500, "Error creating", "Internal Server Error");
    }
}
