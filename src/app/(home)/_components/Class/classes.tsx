import { ClassType } from "@/types/types";
import ClassCard from "./class-card";
import CreateForm from "./create-form";
import GuardByUserRole from "@/components/guard-by-user-role";

const URL = process.env.NEXT_PUBLIC_API_URL;

export default async function Classes() {
  let data;

  try {
    const response = await fetch(`${URL}/api/classes`);
    data = (await response.json()) as ClassType[];
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="flex flex-col gap-2">
      <GuardByUserRole allowed_roles={["ADMIN", "MODERATOR"]}>
        <CreateForm />
      </GuardByUserRole>
      {data &&
        data.length > 0 &&
        data.map((a, i) => <ClassCard data={a} key={i} />)}
      {!data && "No classes found."}
    </div>
  );
}
