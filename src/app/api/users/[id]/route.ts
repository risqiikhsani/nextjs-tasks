import prisma from "@/lib/prisma";

function jsonResponse(status: number, message: string, error?: string) {
    return new Response(JSON.stringify({ status, message, error }), {
        status,
        headers: { "Content-Type": "application/json" }
    });
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
        });

        if (!user) {
            return jsonResponse(404, "user not found");
        }

        return Response.json(user);
    } catch (error) {
        console.error("Error getting user:", error);
        return jsonResponse(500, "Error getting user");
    }
}