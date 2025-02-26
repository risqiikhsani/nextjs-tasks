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
  logger.info("== Check Password Class ==");
  const id = (await params).id;

  const response = await prisma.class.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      password: true
    }
  });

  return Response.json(response);
}
