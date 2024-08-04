import prisma from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const coupon = await prisma.coupon.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!coupon) {
            return new Response("coupon not found", { status: 404 });
        }

        return Response.json(coupon);
    } catch (error) {
        console.error("Error getting coupon:", error);
        return new Response("Error getting coupon", { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const deletedcoupon = await prisma.coupon.delete({
            where: {
                id: parseInt(id),
            },
        });

        if (!deletedcoupon) {
            return new Response("coupon not found", { status: 404 });
        }

        return new Response("coupon deleted successfully");
    } catch (error) {
        console.error("Error deleting coupon:", error);
        return new Response("Error deleting coupon", { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await request.json();
    const { name, description ,image, category, code, expiredTime, amount } = body;

    try {
        const updatedcoupon = await prisma.coupon.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name,
                description,
                image,
                category,
                code,
                expiredTime,
                amount,
            },
        });

        if (!updatedcoupon) {
            return new Response("coupon not found", { status: 404 });
        }

        return Response.json(updatedcoupon);
    } catch (error) {
        console.error("Error updating coupon:", error);
        return new Response("Error updating coupon", { status: 500 });
    }
}