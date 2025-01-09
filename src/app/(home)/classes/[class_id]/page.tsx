import Courses from "../../_components/Course/courses";

import { ClassWithCreatorType } from "@/types/types";
import ClassCard from "@/app/(home)/_components/Class/class-card";

const URL = process.env.NEXT_PUBLIC_API_URL;
export default async function Page({
  params,
}: {
  params: Promise<{ class_id: string }>;
}) {
  const class_id = (await params).class_id;

  const response = await fetch(`${URL}/api/classes/${class_id}`);
  const data: ClassWithCreatorType = await response.json();

  return (
    <div className="flex flex-col gap-2">
      <ClassCard data={data} detail />
      <Courses class_id={class_id} />
    </div>
  );
}
