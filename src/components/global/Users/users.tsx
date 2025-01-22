import React from "react";
import UserCard from "./user-card";
import { User } from "@prisma/client";
import { clientErrorHandler } from "@/lib/error-handler";

const URL = process.env.NEXT_PUBLIC_API_URL;
export default async function Users({
  organization_id,
}: {
  organization_id: string;
}) {
  let data: User[] | undefined = undefined;

  try {
    const response = await fetch(
      `${URL}/api/users?organization_id=${organization_id}`
    );
    data = await response.json();
  } catch (error) {
    clientErrorHandler(error);
  }

  return (
    <div>
      {data ? (
        <div>
          {data.map((a, i) => (
            <UserCard data={a} key={i} />
          ))}
        </div>
      ) : (
        <p>No Users found</p>
      )}
    </div>
  );
}
