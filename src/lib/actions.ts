"use server";

import { revalidatePath } from "next/cache";

export async function RevalidatePath(path: string) {
  revalidatePath(path);
}

export async function createErrorResponse(
  message: string,
  status: number = 500
) {
  return Response.json(
    {
      message,
      status,
    },
    { status }  // Important: Add status to response options
  );
}

export async function Authorize({user_role,authorized_role}:{user_role:string,authorized_role:string}){
  if(user_role !== authorized_role){
    return createErrorResponse("Unauthorized", 401);
  }
}