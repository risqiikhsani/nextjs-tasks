import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  console.log("== Running Get Class Detail ==");
  const id = (await params).id;
  const classDetail = await prisma.class.findUnique({
    where: {
      id: parseInt(id),
    },
    include:{
      creator:true
    }
  });

  if (!classDetail) {
    return Response.json({ error: "Class not found" }, { status: 404 });
  }

  // Add `is_password` and remove `password`
  const response = {
    ...classDetail,
    is_password: classDetail.password !== null,
    password: undefined, // Remove the password field from the output
  };

  return Response.json(response);
}

export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  console.log("== Running Put Class ==");
  const id = (await params).id;

  const formData = await req.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const password = formData.get("password");

  if (!name || !description) {
    throw Error;
  }

  console.log("== Passed the body checks ==");

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
      console.error("Error: ", error.stack);
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
  console.log("== Running Delete Class ==");
  const id = (await params).id;



  try {
    await prisma.class.delete({
      where: {
        id: parseInt(id),
      },
    });    
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error: ", error.stack);
    }
  }

  return Response.json("Deleted");
}
