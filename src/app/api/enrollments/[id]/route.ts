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
  console.log("== Running Get classEnrollment Detail ==");
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
  console.log("== Running Delete classEnrollment ==");
  const id = (await params).id;

  await prisma.classEnrollment.delete({
    where: {
      id: parseInt(id),
    },
  });

  return Response.json("Deleted");
}
