import { auth } from "@/auth";
import { UserRole } from "@prisma/client";
import React, { ReactNode } from "react";

export default async function GuardByUserRole({ allowed_roles,children }: { allowed_roles: UserRole[],children:ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    return <div></div>;
  }

  if (allowed_roles && !allowed_roles.includes(session.user.role)) {
    return <div></div>;
  }

  return <div>{children}</div>;
}
