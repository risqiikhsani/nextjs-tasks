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
  logger.info("== Get Task Detail ==");
  const id = (await params).id;

  const response = await prisma.task.findUnique({
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
  logger.info("== Put Task ==");
  const id = (await params).id;

  const formData = await req.formData();
  const name = formData.get("name");
  const description = formData.get("description");

  if (!name || !description) {
    throw Error;
  }

  logger.info("== Passed the body checks ==");

  try {
    await prisma.task.update({
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
      logger.error("error update task: ", error.stack);
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
  logger.info("== Delete Task ==");
  const id = (await params).id;


  try {
    await prisma.task.delete({
      where: {
        id: parseInt(id),
      },
    });
  
    return Response.json("Deleted");    
  } catch (error) {
    logger.error("error delete task: ", error);
  }
}
