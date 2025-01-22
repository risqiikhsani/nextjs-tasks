import { auth } from "@/auth";
import { createErrorResponse } from "@/lib/actions";
import logger from "@/lib/logger";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request:NextRequest) {
  logger.info("== Get Classes ==");

  const searchParams = request.nextUrl.searchParams
  const organization_id = searchParams.get('organization_id') 

  if(!organization_id){
    return createErrorResponse("Organization ID not provided", 400)
  }

  const classes = await prisma.class.findMany({
    where: {
      orgId: organization_id,
    },
    include: {
      creator: true,
    },
  });

  // Process the classes to add `is_password` and remove `password`
  const response = classes.map((cls) => ({
    ...cls,
    is_password: cls.password !== null, // Add `is_password`
    password: undefined, // Remove `password`
  }));

  return Response.json(response);
}

export async function POST(req: Request) {
  logger.info("== Post Class ==");

  const session = await auth();
  if (!session) {
    return createErrorResponse("Not Authenticated");
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return createErrorResponse("User not found");
  }

  const formData = await req.formData();
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const password = formData.get("password")?.toString();
  const orgId = formData.get("organization_id")?.toString();

  const org = await prisma.organization.findUnique({
    where: {
      id: orgId,
    },
  });
  if (!org) {
    return createErrorResponse("Organization not found");
  }
  const members = await prisma.organizationMember.findMany({
    where: {
      orgId: orgId,
    },
  });
  const memberIds = members.map((member) => member.userId);
  if (!memberIds.includes(user.id)) {
    return createErrorResponse("User not a member of the organization");
  }


  if (!orgId || !name || !description) {
    return Response.json("");
  }

  try {
    // Use transaction to create both class and enrollment
    await prisma.$transaction(async (tx) => {
      // Create the class
      const newClass = await tx.class.create({
        data: {
          name,
          description,
          password,
          creatorId: user.id,
          orgId:orgId
        },
      });

      // Create enrollment for the creator
      await tx.classEnrollment.create({
        data: {
          userId: user.id,
          classId: newClass.id,
          role: "CREATOR",
        },
      });

      return newClass;
    });

    return Response.json("Created");
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error Post Class: ", error.stack);
    }
  }
}
