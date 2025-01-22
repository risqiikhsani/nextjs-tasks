import { auth } from "@/auth";
import { createErrorResponse } from "@/lib/actions";
import logger from "@/lib/logger";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  logger.info("== Get Class Detail ==");
  const id = (await params).id;

  try {
    const classDetail = await prisma.class.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        creator: true,
      },
    });
    // Add `is_password` and remove `password`
    const response = {
      ...classDetail,
      is_password: classDetail?.password !== null,
      password: undefined, // Remove the password field from the output
    };

    return Response.json(response);
  } catch (error) {
    logger.error("error get class: ", error);
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
  logger.info("== Put Class ==");
  const id = (await params).id;

  const formData = await req.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const password = formData.get("password");

  if (!name || !description) {
    throw Error;
  }

  logger.info("== Passed the body checks ==");

  try {
    await prisma.class.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name.toString(),
        description: description.toString(),
        password: password?.toString() || null,
      },
    });
    return Response.json("Updated");
  } catch (error) {
    if (error instanceof Error) {
      logger.error("error update class: ", error.stack);
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
  logger.info("== Delete Class ==");
  const id = (await params).id;

  try {
    await prisma.class.delete({
      where: {
        id: parseInt(id),
      },
    });
    return Response.json("Deleted");
  } catch (error) {
    if (error instanceof Error) {
      logger.error("error delete class: ", error.stack);
    }
  }
}
