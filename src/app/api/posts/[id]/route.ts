import prisma from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!post) {
            return new Response("Post not found", { status: 404 });
        }

        return Response.json(post);
    } catch (error) {
        console.error("Error getting post:", error);
        return new Response("Error getting post", { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const deletedPost = await prisma.post.delete({
            where: {
                id: parseInt(id),
            },
        });

        if (!deletedPost) {
            return new Response("Post not found", { status: 404 });
        }

        return new Response("Post deleted successfully");
    } catch (error) {
        console.error("Error deleting post:", error);
        return new Response("Error deleting post", { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await request.json();
    const { title, text } = body;

    if (!title || !text) {
        return new Response("Please provide both title and text", { status: 400 });
    }

    try {
        const updatedPost = await prisma.post.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title,
                text,
            },
        });

        if (!updatedPost) {
            return new Response("Post not found", { status: 404 });
        }

        return Response.json(updatedPost);
    } catch (error) {
        console.error("Error updating post:", error);
        return new Response("Error updating post", { status: 500 });
    }
}