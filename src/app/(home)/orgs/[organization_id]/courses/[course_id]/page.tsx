import React from "react";
import Tasks from "@/components/global/Task/tasks";
import CourseCard from "@/components/global/Course/course-card";
import { CourseType } from "@/types/types";

const URL = process.env.NEXT_PUBLIC_API_URL;
export default async function Page({
  params,
}: {
  params: Promise<{ course_id: string }>;
}) {
  const course_id = (await params).course_id;
  const response = await fetch(`${URL}/api/courses/${course_id}`);
  const data: CourseType = await response.json();
  return (
    <div>
      {data ? (
        <div className="flex flex-col gap-2">
          <CourseCard data={data} detail />
          <Tasks course_id={course_id} />
        </div>
      ):(
        <p>No data found</p>
      )}
    </div>
  );
}
