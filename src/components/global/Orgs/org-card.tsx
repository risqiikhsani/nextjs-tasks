import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import MenuWrapper from "@/components/menu-wrapper";
import { Badge } from "@/components/ui/badge";
import { ConvertDate } from "@/lib/convert-date";
import { OrganizationType } from "@/types/types";
import Link from "next/link";
import DeleteForm from "./delete-form";
import Join from "./join/join";
import UpdateForm from "./update-form";
import GuardByClassEnrollmentRole from "@/components/GuardByClassEnrollmentRole";

export default function OrgCard({
  data,
  detail = false, // Default value for `detail`
}: {
  data: OrganizationType;
  detail?: boolean; // Make `detail` optional
}) {
  return (
    <div>
      <Card className="p-4">
        <Badge className="">Organization</Badge>
        <h1 className="flex gap-2 items-center text-4xl font-bold">
          {data.name} <span></span>
        </h1>

        {detail && (
          <div>
            <p className="text-sm text-muted-foreground">
              Creator : {data.creator.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {ConvertDate(data.createdAt)}
            </p>
          </div>
        )}

        {data.description}

        <div className="flex gap-2 justify-end items-center">
          <Join data={data} />

          {!detail && (
            <Button asChild variant="outline">
              <Link href={`/orgs/${data.id}`}>Detail</Link>
            </Button>
          )}

          {/* <GuardByEnrollmentRole allowed_roles={["CREATOR"]} class_id={data.id}> */}
            <MenuWrapper>
              <UpdateForm data={data} />
              <DeleteForm data={data} />
            </MenuWrapper>
          {/* </GuardByEnrollmentRole> */}
        </div>
      </Card>
    </div>
  );
}
