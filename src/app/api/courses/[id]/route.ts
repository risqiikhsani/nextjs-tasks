import { auth } from "@/auth";
import { createErrorResponse } from "@/lib/actions";
import logger from "@/lib/logger";
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
  logger.info("== Get Course Detail ==");
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
  logger.info("== Put Course ==");
  const id = (await params).id;

  const formData = await req.formData();
  const name = formData.get("name");
  const description = formData.get("description");

  if (!name || !description) {
    throw Error;
  }

  logger.info("== Passed the body checks ==");

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
      logger.error("error update course: ", error.stack);
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
  logger.info("== Delete Course ==");
  const id = (await params).id;


  try {
    await prisma.course.delete({
      where: {
        id: parseInt(id),
      },
    });
  
    return Response.json("Deleted");    
  } catch (error) {
    logger.error("error delete course: ", error);
  }
}
