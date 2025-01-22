"use client";
import { useDataStore } from "@/stores/data";

export default function GetDataStore() {
  const { user,enrollments,orgs } = useDataStore((state) => state);
  return (
    <div className="flex flex-col gap-2">
      <h1>State</h1>
      <p>user</p>
      <p>{user && JSON.stringify(user)}</p>
      <p>class enrollments</p>
      <p>{enrollments && JSON.stringify(enrollments)}</p>
      <p>joined orgs</p>
      <p>{orgs && JSON.stringify(orgs)}</p>
    </div>
  );
}
