import OrganizationMembers from "@/components/global/OrgMembers/organization-members";

export default async function Page({params}:{params:Promise<{ organization_id: string }>}) {
  return (
    <div>
      <OrganizationMembers organization_id={(await params).organization_id}/>
    </div>
  )
}
