"use client";
import { useDataStore } from "@/stores/data";

export default function GetDataStore() {
  const { user,enrollments } = useDataStore((state) => state);
  return (
    <div className="flex flex-col gap-2">
      <h1>State</h1>
      <p>{user && JSON.stringify(user)}</p>
      <p>{enrollments && JSON.stringify(enrollments)}</p>
    </div>
  );
}
