import { auth } from "@/auth";
import { createErrorResponse } from "@/lib/actions";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  console.log("== Running Get Course Detail ==");
  const id = (await params).id;

  const response = await prisma.course.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      creator: true,
    },
  });
  return Response.json(response);
}

export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  console.log("== Running Put Course ==");
  const id = (await params).id;

  const formData = await req.formData();
  const name = formData.get("name");
  const description = formData.get("description");

  if (!name || !description) {
    throw Error;
  }

  console.log("== Passed the body checks ==");

  try {
    await prisma.course.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name.toString(),
        description: description.toString(),
      },
    });
    return Response.json("Updated");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error: ", error.stack);
    }
  }
}

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  console.log("== Running Delete Course ==");
  const id = (await params).id;

  await prisma.class.delete({
    where: {
      id: parseInt(id),
    },
  });

  return Response.json("Deleted");
}
