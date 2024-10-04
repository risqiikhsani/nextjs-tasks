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
        const task = await prisma.task.findUnique({
            where: { id: parseInt(id) },
        });

        if (!task) {
            return jsonResponse(404, "Task not found");
        }

        return new Response(JSON.stringify(task), { status: 200 });
    } catch (error) {
        console.error("Error getting task:", error);
        return jsonResponse(500, "Error getting task", "Internal Server Error");
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
        const task = await prisma.task.findUnique({
            where: { id: parseInt(id) },
        });

        if (!task) {
            return jsonResponse(404, "Task not found");
        }

        if (task.authorId.toString() !== session.user.id.toString()) {
            return jsonResponse(403, "Forbidden");
        }

        await prisma.task.delete({ where: { id: parseInt(id) } });

        return jsonResponse(200, "Task deleted successfully");
    } catch (error) {
        console.error("Error deleting task:", error);
        return jsonResponse(500, "Error deleting task", "Internal Server Error");
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
    const { name, detail, image } = body;

    try {
        const task = await prisma.task.findUnique({
            where: { id: parseInt(id) },
        });

        if (!task) {
            return jsonResponse(404, "Task not found");
        }

        if (task.authorId.toString() !== session.user.id.toString()) {
            return jsonResponse(403, "Forbidden");
        }

        const updatedTask = await prisma.task.update({
            where: { id: parseInt(id) },
            data: { name, detail, image },
        });

        return new Response(JSON.stringify(updatedTask), { status: 200 });
    } catch (error) {
        console.error("Error updating task:", error);
        return jsonResponse(500, "Error updating task", "Internal Server Error");
    }
}
