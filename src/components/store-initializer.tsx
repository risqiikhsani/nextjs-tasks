"use client";
import { useDataStore } from "@/stores/data";
import {
  ClassEnrollment as ClassEnrollmentType,
  User as UserType,
} from "@prisma/client";
import { useEffect, useRef } from "react";

export function StoreInitializer({
  user,
  enrollments,
}: {
  user: UserType;
  enrollments: ClassEnrollmentType[];
}) {
  // const initialized = useRef(false);

  // useEffect(() => {
  //   if (!initialized.current) {
  //     useDataStore.setState({ user, enrollments });
  //     initialized.current = true;
  //   }
  // }, [user, enrollments]);

  // useEffect(() => {
  //   if (!initialized.current) {
  //     useDataStore.setState({ user, enrollments })
  //     initialized.current = true
  //   }
  // }, [user, enrollments])
  
  // Also update when props change, even after initialization
  useEffect(() => {
    useDataStore.setState({ user, enrollments })
  }, [user, enrollments])

  return null;
}
