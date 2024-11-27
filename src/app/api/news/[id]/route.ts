import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth/next";

function jsonResponse(status: number, message: string, error?: string) {
    return new Response(JSON.stringify({ status, message, error }), {
        status,
        headers: { "Content-Type": "application/json" }
    });
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const news = await prisma.news.findUnique({
            where: { id: parseInt(id) },
        });

        if (!news) {
            return jsonResponse(404, "news not found");
        }

        return new Response(JSON.stringify(news), { status: 200 });
    } catch (error) {
        console.error("Error getting news:", error);
        return jsonResponse(500, "Error getting news", "Internal Server Error");
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {

        // this session only detected if post was sent from client side page
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return jsonResponse(401, "Unauthorized");
    }

    const { id } = params;

    try {
        const news = await prisma.news.findUnique({
            where: { id: parseInt(id) },
        });

        if (!news) {
            return jsonResponse(404, "news not found");
        }

        if (news.authorId.toString() !== session.user.id.toString()) {
            return jsonResponse(403, "Forbidden");
        }

        await prisma.news.delete({ where: { id: parseInt(id) } });

        return jsonResponse(200, "news deleted successfully");
    } catch (error) {
        console.error("Error deleting news:", error);
        return jsonResponse(500, "Error deleting news", "Internal Server Error");
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {

        // this session only detected if post was sent from client side page
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return jsonResponse(401, "Unauthorized");
    }

    const { id } = params;
    const body = await request.json();
    const { title, text, image } = body;

    try {
        const news = await prisma.news.findUnique({
            where: { id: parseInt(id) },
        });

        if (!news) {
            return jsonResponse(404, "news not found");
        }

        if (news.authorId.toString() !== session.user.id.toString()) {
            return jsonResponse(403, "Forbidden");
        }

        const updatednews = await prisma.news.update({
            where: { id: parseInt(id) },
            data: { title, text, image },
        });

        return new Response(JSON.stringify(updatednews), { status: 200 });
    } catch (error) {
        console.error("Error updating news:", error);
        return jsonResponse(500, "Error updating news", "Internal Server Error");
    }
}
