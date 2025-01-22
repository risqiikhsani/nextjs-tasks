import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import logger from "@/lib/logger";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  logger.info("== Get Org Detail ==");
  const id = (await params).id;
  const data = await prisma.organization.findUnique({
    where: {
      id: id,
    },
    include:{
      creator:true
    }
  });

  if (!data) {
    return Response.json({ error: "Org not found" }, { status: 404 });
  }


  return Response.json(data);
}

export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  logger.info("== Put Org ==");
  const id = (await params).id;

  const formData = await req.formData();
  const name = formData.get("name");
  const description = formData.get("description");

  if (!name || !description) {
    throw Error;
  }

  logger.info("== Passed the body checks ==");

  try {
    await prisma.organization.update({
      where: {
        id: id,
      },
      data: {
        name: name.toString(),
        description: description.toString(),
      },
    });
    return Response.json("Updated");
  } catch (error) {
    if (error instanceof Error) {
      logger.error("error update org: ", error.stack);
    }
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  logger.info("== Delete Org ==");
  const id = (await params).id;



  try {
    await prisma.organization.delete({
      where: {
        id: id,
      },
    });    
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error delete org: ", error.stack);
    }
  }

  return Response.json("Deleted");
}
