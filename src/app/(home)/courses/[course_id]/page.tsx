import React from "react";
import Tasks from "../../_components/Task/tasks";
import CourseCard from "../../_components/Course/course-card";
import { CourseWithCreatorType } from "@/types/types";


const URL = process.env.NEXT_PUBLIC_API_URL
export default async function Page({
  params,
}: {
  params: Promise<{ course_id: string }>;
}) {
  const course_id = (await params).course_id;
  const response = await fetch(`${URL}/api/courses/${course_id}`)
  const data : CourseWithCreatorType  = await response.json()
  return (
    <div className="flex flex-col gap-2">
      <CourseCard data={data} detail/>
      <Tasks course_id={course_id}/>
    </div>
  );
}
