"use client";

import { useDataStore } from "@/stores/data";
import { OrgRole } from "@prisma/client";
import React, { ReactNode } from "react";

export default function GuardByOrganizationRole({
  allowed_roles,
  children,
  organization_id,
}: {
  allowed_roles:OrgRole[]
  children: ReactNode;
  organization_id: string;
}) {
  const { user, orgs } = useDataStore((state) => state);
  if (!user) {
    return <div></div>;
  }
  if(!orgs){
    return <div></div>
  }

  const isAllowed = orgs?.some(
    (org) =>
      org.orgId === organization_id &&
      org.role &&
      allowed_roles.includes(org.role)
  );

  if (!isAllowed) {
    return <div></div>;
  }

  return <div>{children}</div>;
}
