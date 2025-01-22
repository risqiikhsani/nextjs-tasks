import { createErrorResponse } from "@/lib/actions";
import logger from "@/lib/logger";
import prisma from "@/lib/prisma";


export async function GET(request: Request, { params }: { params: { id: string } }) {
    logger.info("== Get User Detail ==")
    const { id } = params;

    try {
        const user = await prisma.user.findUnique({
            where: { id: id},
        });

        if (!user) {
            return createErrorResponse( "user not found", 404);
        }

        return Response.json(user);
    } catch (error) {
        logger.error("Error get user detail:", error);
        return createErrorResponse("Error getting user", 500);
    }
}