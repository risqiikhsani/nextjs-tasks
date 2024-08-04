import prisma from "@/lib/prisma";


export async function GET(request: Request) {
    const result = await prisma.coupon.findMany({
        // include: {
        //     _count: {
        //         select: {
        //             hasil_response: true
        //         }
        //     }
        // }
    })
    return Response.json(result)
}


export async function POST(request: Request) {
    const body = await request.json();
    const { name, description ,image, category, code, expiredTime, amount } = body;

    if (!name) {
        return new Response("Please provide both name", { status: 400 });
    }

    if (!code) {
        return new Response("Please provide both code", { status: 400 });
    }

    if (!code) {
        return new Response("Please provide both code", { status: 400 });
    }

    if (!expiredTime) {
        return new Response("Please provide both expiredTime", { status: 400 });
    }
    
    try {
        const newCoupon = await prisma.coupon.create({
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

        return new Response(JSON.stringify(newCoupon), {
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