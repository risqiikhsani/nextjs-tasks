import { Card, CardContent } from "@/components/ui/card";
import { ConvertDate } from "@/lib/convert-date";
import { OrganizationMemberType } from "@/types/types";
import DeleteForm from "./delete-form";
import { Badge } from "@/components/ui/badge";
import UpdateForm from "./update-form";
import UserViewCard from "../user-view-card";

export default function OrganizationMemberCard({
  data,
  detail = false,
}: {
  data: OrganizationMemberType;
  detail?: boolean;
}) {
  return (
    <div>
      <Card className="p-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
        <UserViewCard data={data.user}/>
        <Badge variant="outline" className="bg-green-400">
          {data.role.toLowerCase()}
        </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Member since : {ConvertDate(data.joinedAt)}
        </p>
        {data.role !== "CREATOR" && (
          <div className="flex flex-row gap-2">
            <UpdateForm data={data} />
            <DeleteForm data={data} />
          </div>
        )}
      </Card>
    </div>
  );
}
