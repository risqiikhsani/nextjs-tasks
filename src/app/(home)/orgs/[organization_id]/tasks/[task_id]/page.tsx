import React from "react";
import TaskCard from "@/components/global/Task/task-card";

const URL = process.env.NEXT_PUBLIC_API_URL;
export default async function Page({
  params,
}: {
  params: Promise<{ task_id: string }>;
}) {
  const task_id = (await params).task_id;
  const response = await fetch(`${URL}/api/tasks/${task_id}`);
  const data = await response.json();

  return (
    <div>
      {data ? (
        <div>
          <TaskCard data={data} detail />
        </div>
      ) : (
        <p>No data found</p>
      )}
    </div>
  );
}
