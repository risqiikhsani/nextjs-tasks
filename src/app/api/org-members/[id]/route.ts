import { auth } from "@/auth";
import { createErrorResponse } from "@/lib/actions";
import logger from "@/lib/logger";
import prisma from "@/lib/prisma";
import { OrgRole } from "@prisma/client";
import { NextRequest } from "next/server";

// Type guard to check if a string is a valid OrgRole
function isValidOrgRole(role: string): role is OrgRole {
  return Object.values(OrgRole).includes(role as OrgRole);
}

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
    return createErrorResponse("Failed to get organization member detail", 500);
  }
}

export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  logger.info("== Put Org Member ==");
  const id = (await params).id;

  try {
    const formData = await req.formData();
    const roleValue = formData.get("role");

    // Check if role exists
    if (!roleValue) {
      return createErrorResponse("Role is required", 400);
    }

    // Convert role to string and uppercase
    const roleString = roleValue.toString().toUpperCase();

    // Validate if the role is a valid OrgRole
    if (!isValidOrgRole(roleString)) {
      return createErrorResponse(
        `Invalid role. Must be one of: ${Object.values(OrgRole).join(', ')}`,
        400
      );
    }

    // Update the organization member
    const updatedMember = await prisma.organizationMember.update({
      where: {
        id: parseInt(id),
      },
      data: {
        role: roleString as OrgRole,
      },
    });

    return Response.json({ 
      message: "Updated successfully", 
      member: updatedMember 
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error("error update org member: ", error.stack);
    }
    return createErrorResponse("Failed to update organization member", 500);
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
    return createErrorResponse("Failed to delete organization member", 500);
  }
}
