import { OrganizationMemberType } from "@/types/types";
import OrganizationMemberCard from "./organization-member-card"
import { clientErrorHandler } from "@/lib/error-handler";

const URL = process.env.NEXT_PUBLIC_API_URL;

export default async function OrganizationMembers({ organization_id }: { organization_id: string }) {
  let data: OrganizationMemberType[] | undefined = undefined;
  try {
    const response = await fetch(
      `${URL}/api/org-members?organization_id=${organization_id}`
    );
    data = await response.json();
  } catch (error) {
    clientErrorHandler(error)
  }

  return (
    <div className="flex flex-col gap-4">
      {data ? (
        data.map((a, i) => <OrganizationMemberCard data={a} key={i} />)
      ) : (
        <p>No Members found</p>
      )}
    </div>
  );
}
