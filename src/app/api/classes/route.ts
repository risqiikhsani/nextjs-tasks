import { auth } from "@/auth";
import { createErrorResponse } from "@/lib/actions";
import logger from "@/lib/logger";
import prisma from "@/lib/prisma";
import { ClassRole, OrgRole } from "@prisma/client";
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

// Check if user has required permissions
async function checkOrgPermissions(userId: string, orgId: string) {
  const member = await prisma.organizationMember.findFirst({
    where: {
      userId,
      orgId,
      role: {
        in: [OrgRole.CREATOR, OrgRole.ADMIN]
      }
    }
  });

  return !!member;
}

export async function POST(req: Request) {
  logger.info("== Post Class ==");

  try {
    // Authentication check
    const session = await auth();
    if (!session?.user?.email) {
      return createErrorResponse("Not Authenticated", 401);
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return createErrorResponse("User not found", 404);
    }

    // Parse form data
    const formData = await req.formData();
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const password = formData.get("password")?.toString();
    const orgId = formData.get("organization_id")?.toString();

    // Validate required fields
    if (!orgId || !name || !description) {
      return createErrorResponse("Missing required fields", 400);
    }

    // Check if organization exists
    const org = await prisma.organization.findUnique({
      where: { id: orgId }
    });

    if (!org) {
      return createErrorResponse("Organization not found", 404);
    }

    // Check user's role and permissions
    const hasPermission = await checkOrgPermissions(user.id, orgId);
    
    if (!hasPermission) {
      return createErrorResponse(
        "Only CREATOR or ADMIN members can create classes", 
        403
      );
    }

    // Create class and enrollment in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create the class
      const newClass = await tx.class.create({
        data: {
          name,
          description,
          password,
          creatorId: user.id,
          orgId
        }
      });

      // Create enrollment for the creator
      await tx.classEnrollment.create({
        data: {
          userId: user.id,
          classId: newClass.id,
          role: ClassRole.CREATOR
        }
      });

      return newClass;
    });

    return Response.json({
      message: "Class created successfully",
      class: result
    });

  } catch (error) {
    logger.error("Error creating class: ", 
      error instanceof Error ? error.stack : 'Unknown error'
    );
    return createErrorResponse(
      "Failed to create class", 
      500
    );
  }
}