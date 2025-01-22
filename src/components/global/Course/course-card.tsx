import MenuWrapper from "@/components/menu-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ConvertDate } from "@/lib/convert-date";
import { CourseType } from "@/types/types";
import Link from "next/link";
import DeleteForm from "./delete-form";
import UpdateForm from "./update-form";
import GuardByClassEnrollmentRole from "@/components/GuardByClassEnrollmentRole";


export default function CourseCard({
  data,
  detail = false,
}: {
  data: CourseType;
  detail?: boolean;
}) {
  return (
    <div>
      <Card className="p-4 ">
        <Badge className="">Course</Badge>
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
          {!detail && (
            <Button asChild variant="outline">
              <Link href={`/courses/${data.id}`}>Detail</Link>
            </Button>
          )}
          <GuardByClassEnrollmentRole
            allowed_roles={["CREATOR"]}
            class_id={data.classId}
          >
            <MenuWrapper>
              <UpdateForm data={data} />
              <DeleteForm data={data} />
            </MenuWrapper>
          </GuardByClassEnrollmentRole>
        </div>
      </Card>
    </div>
  );
}
