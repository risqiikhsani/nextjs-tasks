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
  logger.info("== Get classEnrollment Detail ==");
  const id = (await params).id;

  const response = await prisma.classEnrollment.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return Response.json(response);
}

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  logger.info("== Delete classEnrollment ==");
  const id = (await params).id;

  try {
    await prisma.classEnrollment.delete({
      where: {
        id: parseInt(id),
      },
    });

    return Response.json("Deleted");
  } catch (error) {
    logger.error("Error delete class enrollment .", error);
  }
}
