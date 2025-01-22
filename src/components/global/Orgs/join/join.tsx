import { OrganizationType } from "@/types/types";
import CreateForm from "./create-form";

export default async function Join({ data }: { data:OrganizationType }) {

  return (
    <CreateForm data={data}/>
  );
}
