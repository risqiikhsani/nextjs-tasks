import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import MenuWrapper from "@/components/menu-wrapper";
import { Badge } from "@/components/ui/badge";
import { ConvertDate } from "@/lib/convert-date";
import { ClassType } from "@/types/types";
import Link from "next/link";
import DeleteForm from "./delete-form";
import Join from "./join/join";
import UpdateForm from "./update-form";
import GuardByEnrollmentRole from "@/components/guard-by-enrollment-role";

export default function ClassCard({
  data,
  detail = false, // Default value for `detail`
}: {
  data: ClassType;
  detail?: boolean; // Make `detail` optional
}) {
  return (
    <div>
      <Card className="p-4 border-l-8 border-green-400">
        <h1 className="flex gap-2 items-center text-4xl font-bold">
          {data.name}{" "}
          <span>
            <Badge className="bg-green-400 p-2">Class</Badge>
          </span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Creator : {data.creator.name}
        </p>
        <p className="text-sm text-muted-foreground">
          {ConvertDate(data.createdAt)}
        </p>

        {data.description}

        <div className="flex gap-2 justify-end items-center">
          <Join data={data} />
          {!detail && (
            <Button asChild variant="outline">
              <Link href={`/classes/${data.id}`}>Detail</Link>
            </Button>
          )}

          <GuardByEnrollmentRole allowed_roles={["CREATOR"]} class_id={data.id}>
            <MenuWrapper>
              <UpdateForm data={data} />
              <DeleteForm data={data} />
            </MenuWrapper>
          </GuardByEnrollmentRole>
        </div>
      </Card>
    </div>
  );
}
