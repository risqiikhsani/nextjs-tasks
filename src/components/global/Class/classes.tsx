import { ClassType } from "@/types/types";
import ClassCard from "./class-card";
import CreateForm from "./create-form";
import { clientErrorHandler } from "@/lib/error-handler";

const URL = process.env.NEXT_PUBLIC_API_URL;

export default async function Classes({organization_id}:{organization_id:string}) {
  let data;

  try {
    const response = await fetch(`${URL}/api/classes?organization_id=${organization_id}`);
    data = (await response.json()) as ClassType[];
  } catch (error) {
    clientErrorHandler(error)
  }

  return (
    <div className="flex flex-col gap-2">
        <CreateForm organization_id={organization_id}/>
      <div className="grid md:grid-cols-2 gap-2">
      {data &&
        data.length > 0 &&
        data.map((a, i) => <ClassCard data={a} key={i} />)}
      {!data && "No classes found."}
      </div>

    </div>
  );
}
