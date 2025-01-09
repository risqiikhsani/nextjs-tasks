import { TaskWithCreatorType } from "@/types/types";
import CreateForm from "./create-form";
import TaskCard from "./task-card";

const URL = process.env.NEXT_PUBLIC_API_URL;

export default async function Tasks({ course_id }: { course_id: string }) {
  const response = await fetch(`${URL}/api/tasks?course_id=${course_id}`);
  const data: TaskWithCreatorType[] = await response.json();

  return (
    <div className="flex flex-col gap-4">
      <CreateForm course_id={course_id} />
      {data ? (
        data.map((a, i) => (
          <TaskCard data={a} key={i}/>
        ))
      ) : (
        <p>No courses found</p>
      )}
    </div>
  );
}
