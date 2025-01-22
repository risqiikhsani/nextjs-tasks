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
  logger.info("== Get Join Requests Detail ==");
  const id = (await params).id;

  const searchParams = req.nextUrl.searchParams
  const action = searchParams.get('action')

  if(action !== "accept" && action !== "reject"){
    return createErrorResponse("Invalid action", 400)
  }

  const response = await prisma.joinRequest.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  let message;

  if(response && action === "accept"){
    message = "accept"
    await prisma.organizationMember.create({
      data:{
        orgId:response?.orgId,
        userId:response?.userId
      }
    })
    await prisma.joinRequest.delete({
      where:{
        id:parseInt(id)
      }
    })
  }
  if(response && action === "reject"){
    message = "reject"
    await prisma.joinRequest.delete({
      where:{
        id:parseInt(id)
      }
    })
  }
  return Response.json({
    message,
    response
  });
}

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  logger.info("== Delete Join Requests ==");
  const id = (await params).id;


  try {
    await prisma.joinRequest.delete({
      where: {
        id: parseInt(id),
      },
    });
  
    return Response.json("Deleted");    
  } catch (error) {
    console.error("error delete join requests.",error)
  }
}
