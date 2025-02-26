"use client";

import { useDataStore } from "@/stores/data";
import { ClassRole } from "@prisma/client";
import React, { ReactNode } from "react";

export default function GuardByClassEnrollmentRole({
  allowed_roles,
  children,
  class_id,
}: {
  allowed_roles:ClassRole[]
  children: ReactNode;
  class_id: number;
}) {
  const { user, enrollments } = useDataStore((state) => state);
  if (!user) {
    return <div></div>;
  }
  if(!enrollments){
    return <div></div>
  }

  const isAllowed = enrollments?.some(
    (enrollment) =>
      enrollment.classId === class_id &&
      enrollment.role &&
      allowed_roles.includes(enrollment.role)
  );

  if (!isAllowed) {
    return <div></div>;
  }

  return <div>{children}</div>;
}
