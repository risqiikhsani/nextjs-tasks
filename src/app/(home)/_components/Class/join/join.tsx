import CreateForm from "./create-form";


const URL = process.env.NEXT_PUBLIC_API_URL;
export default async function Join({ class_id }: { class_id: number }) {
  const response = await fetch(`${URL}/api/classes/${class_id}/check-password`);
  const data = await response.json();

  return (
    <CreateForm password={data.password} class_id={class_id}/>
  );
}
