import { TaskType } from "@/types/types";
import CreateForm from "./create-form";
import TaskCard from "./task-card";
import { clientErrorHandler } from "@/lib/error-handler";

const URL = process.env.NEXT_PUBLIC_API_URL;

export default async function Tasks({ course_id }: { course_id: string }) {

  let data: TaskType[] | undefined = undefined

  try {
    const response = await fetch(`${URL}/api/tasks?course_id=${course_id}`);
    data = await response.json()
  } catch (error) {
    clientErrorHandler(error)
  }

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
