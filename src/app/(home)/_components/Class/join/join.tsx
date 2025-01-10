import { ClassWithCreatorType } from "@/types/types";
import CreateForm from "./create-form";

export default async function Join({ data }: { data:ClassWithCreatorType }) {

  return (
    <CreateForm data={data}/>
  );
}
