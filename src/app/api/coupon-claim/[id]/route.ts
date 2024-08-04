import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-options";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    console.log("session is ", session);
   
    if (!session || !session.user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { id } = params;

    try {
        // Use a transaction to ensure atomicity
        const [deletedClaimedCoupon, updatedCoupon] = await prisma.$transaction(async (prisma) => {
            // First, fetch the claimed coupon to get the couponId
            const claimedCoupon = await prisma.claimedCoupon.findUnique({
                where: { id: parseInt(id) },
                include: { coupon: true },
            });

            if (!claimedCoupon) {
                throw new Error("Claimed coupon not found");
            }

            // Delete the claimed coupon
            const deletedClaimedCoupon = await prisma.claimedCoupon.delete({
                where: { id: parseInt(id) },
            });

            // Increase the amount of the original coupon by 1
            const updatedCoupon = await prisma.coupon.update({
                where: { id: claimedCoupon.couponId },
                data: { amount: { increment: 1 } },
            });

            return [deletedClaimedCoupon, updatedCoupon];
        });

        return new Response(JSON.stringify({ 
            message: "Claimed coupon deleted and coupon amount increased successfully",
            deletedClaimedCoupon,
            updatedCoupon
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Error deleting claimed coupon:", error);
        if ((error as Error).message === "Claimed coupon not found") {
            return new Response("Claimed coupon not found", { status: 404 });
        }
        return new Response("Error deleting claimed coupon", { status: 500 });
    }
}