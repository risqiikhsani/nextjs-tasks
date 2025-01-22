import { ClassType } from "@/types/types";
import CreateForm from "./create-form";

export default async function Join({ data }: { data:ClassType }) {

  return (
    <CreateForm data={data}/>
  );
}
