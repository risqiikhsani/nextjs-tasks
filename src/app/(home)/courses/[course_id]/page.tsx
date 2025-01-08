import { Course as CourseType } from "@prisma/client";
import React from "react";
import Task from "../../_components/Task/task";


const URL = process.env.NEXT_PUBLIC_API_URL
export default async function Page({
  params,
}: {
  params: Promise<{ course_id: string }>;
}) {
  const course_id = (await params).course_id;
  const response = await fetch(`${URL}/api/courses/${course_id}`)
  const data : CourseType  = await response.json()
  return (
    <div>
      <h1>Course Detail</h1>
      <p>{course_id}</p>
      {JSON.stringify(data)}
      <Task course_id={course_id}/>
    </div>
  );
}
