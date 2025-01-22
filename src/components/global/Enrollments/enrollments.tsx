import { ClassEnrollmentType } from "@/types/types";
import EnrollmentCard from "./enrollment-card";
import { clientErrorHandler } from "@/lib/error-handler";

const URL = process.env.NEXT_PUBLIC_API_URL;

export default async function Enrollments({ class_id }: { class_id: string }) {
  let data: ClassEnrollmentType[] | undefined = undefined;
  try {
    const response = await fetch(
      `${URL}/api/class-enrollments?class_id=${class_id}`
    );
    data = await response.json();
  } catch (error) {
    clientErrorHandler(error)
  }

  return (
    <div className="flex flex-col gap-4">
      {data ? (
        data.map((a, i) => <EnrollmentCard data={a} key={i} />)
      ) : (
        <p>No Members found</p>
      )}
    </div>
  );
}
