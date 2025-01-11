import { auth } from "@/auth";
import { createErrorResponse } from "@/lib/actions";
import prisma from "@/lib/prisma";

export async function GET() {
  console.log("== Running Get Class ==");
  const classes = await prisma.class.findMany({
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
  console.log("== Running Post Class ==");

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

  if (!name || !description) {
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
      console.error("Error: ", error.stack);
    }
  }
}
