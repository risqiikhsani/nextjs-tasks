import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-options";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);

    console.log("session is ",session);
    
    if (!session || !session.user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const result = await prisma.claimedCoupon.findMany({
        include: {
            coupon: true,
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

    const body = await request.json();
    const { couponId } = body;
    
    if (!couponId) {
        return new Response("Please provide couponId", { status: 400 });
    }
   
    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email as string },
        });

        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        // Check if the coupon exists and has available amount
        const coupon = await prisma.coupon.findUnique({
            where: { id: couponId },
        });

        if (!coupon) {
            return new Response("Coupon not found", { status: 404 });
        }

        if (coupon.amount <= 0) {
            return new Response("Coupon is no longer available", { status: 400 });
        }

        // Use a transaction to ensure atomicity
        const [updatedCoupon, newClaimedCoupon] = await prisma.$transaction([
            prisma.coupon.update({
                where: { id: couponId },
                data: { amount: { decrement: 1 } },
            }),
            prisma.claimedCoupon.create({
                data: {
                    claimerId: user.id,
                    couponId: couponId,
                },
            }),
        ]);

        return new Response(JSON.stringify({ updatedCoupon, newClaimedCoupon }), {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error creating coupon:", error);
        return new Response("Error creating coupon", { status: 500 });
    }
}