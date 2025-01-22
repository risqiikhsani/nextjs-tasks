import { CourseType } from "@/types/types";
import CourseCard from "./course-card";
import CreateForm from "./create-form";
import { clientErrorHandler } from "@/lib/error-handler";

const URL = process.env.NEXT_PUBLIC_API_URL;

export default async function Courses({ class_id }: { class_id: string }) {
  let data: CourseType[] | undefined = undefined;
  try {
    const response = await fetch(`${URL}/api/courses?class_id=${class_id}`);
    data = await response.json();
  } catch (error) {
    clientErrorHandler(error);
  }

  return (
    <div className="flex flex-col gap-4">
      <CreateForm class_id={class_id} />
      <div className="grid md:grid-cols-2 gap-2">
        {data ? (
          data.map((a, i) => <CourseCard data={a} key={i} />)
        ) : (
          <p>No courses found</p>
        )}
      </div>
    </div>
  );
}
