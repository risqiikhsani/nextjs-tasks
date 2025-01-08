"use server";

import { revalidatePath } from "next/cache";

export async function RevalidatePath(path: string) {
  revalidatePath(path);
}

export async function createErrorResponse(
  message: string,
  status: number = 500
) {
  return new Response(
    JSON.stringify({
      error: message,
    }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}