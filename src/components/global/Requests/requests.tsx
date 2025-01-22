import { JoinRequestType } from "@/types/types";
import React from "react";
import RequestCard from "./request-card";

const URL = process.env.NEXT_PUBLIC_API_URL;
export default async function Requests({
  organization_id,
}: {
  organization_id: string;
}) {
  const response = await fetch(
    `${URL}/api/org-join-requests?organization_id=${organization_id}`
  );
  const data: JoinRequestType[] = await response.json();

  return (
    <div>
      {data &&
        data.length > 0 &&
        data.map((a, i) => <RequestCard data={a} key={i} />)}
      {!data && "No requests found."}
    </div>
  );
}
