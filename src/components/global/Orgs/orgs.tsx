import { OrganizationType } from "@/types/types";
import ClassCard from "./org-card";
import CreateForm from "./create-form";
import { clientErrorHandler } from "@/lib/error-handler";

const URL = process.env.NEXT_PUBLIC_API_URL;

export default async function Orgs() {
  let data;

  try {
    const response = await fetch(`${URL}/api/orgs`);
    data = (await response.json()) as OrganizationType[];
  } catch (error) {
    clientErrorHandler(error)
  }

  return (
    <div className="flex flex-col gap-2">
        <CreateForm />
      <div className="grid md:grid-cols-2 gap-2">
      {data &&
        data.length > 0 &&
        data.map((a, i) => <ClassCard data={a} key={i} />)}
      {!data && "No orgs found."}
      </div>

    </div>
  );
}
