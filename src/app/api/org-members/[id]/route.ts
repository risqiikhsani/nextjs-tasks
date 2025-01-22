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
  logger.info("== Get Org Member Detail ==");
  const id = (await params).id;

  try {
    const response = await prisma.organizationMember.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return Response.json(response);
  } catch (error) {
    logger.error("error get org members detail :", error);
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
  logger.info("== Delete Org Member ==");
  const id = (await params).id;

  try {
    await prisma.organizationMember.delete({
      where: {
        id: parseInt(id),
      },
    });

    return Response.json("Deleted");
  } catch (error) {
    logger.error("error delete org members :", error);
  }
}
