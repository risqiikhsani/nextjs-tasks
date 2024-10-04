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

    const session = await getServerSession(authOptions);

    console.log("Session:", session);

    if (!session || !session.user) {
        return jsonResponse(401, "Unauthorized");
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email as string },
            include: {
                tasks: true
            }
        });

        return new Response(JSON.stringify(user), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        return jsonResponse(500, "Error fetching user", "Internal Server Error");
    }
}