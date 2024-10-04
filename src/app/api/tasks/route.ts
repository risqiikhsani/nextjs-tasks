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
        const result = await prisma.task.findMany({
            include: {
                author: true
            }
        });

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return jsonResponse(500, "Error fetching tasks", "Internal Server Error");
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
    const { name, detail, image } = body;

    if (!name) {
        return jsonResponse(400, "Please provide a name");
    }

    const authorId = user.id;

    try {
        const new_task = await prisma.task.create({
            data: {
                name,
                detail,
                image,
                author: { connect: { id: authorId } },
            },
        });

        return new Response(JSON.stringify(new_task), {
            status: 201,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error("Error creating task:", error);
        return jsonResponse(500, "Error creating task", "Internal Server Error");
    }
}
