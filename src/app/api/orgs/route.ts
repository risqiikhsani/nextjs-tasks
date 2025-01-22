import { auth } from "@/auth";
import { createErrorResponse } from "@/lib/actions";
import prisma from "@/lib/prisma";
import logger from "@/lib/logger";

export async function GET() {
  logger.info("== Get Orgs ==");
  const orgs = await prisma.organization.findMany({
    include: {
      creator: true,
    },
  });

  return Response.json(orgs);
}

export async function POST(req: Request) {
  logger.info("== Post Orgs ==");

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

  if (!name || !description) {
    return Response.json("");
  }

  try {
    // Use transaction to create both class and enrollment
    await prisma.$transaction(async (tx) => {
      // Create the class
      const organization = await tx.organization.create({
        data: {
          name,
          description,
          creatorId: user.id,
        },
      });

      // Create enrollment for the creator
      await tx.organizationMember.create({
        data: {
          userId: user.id,
          orgId: organization.id,
          role: "CREATOR",
        },
      });

      return organization;
    });

    return Response.json("Created");
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error creating org :", error.stack);
    }
  }
}
