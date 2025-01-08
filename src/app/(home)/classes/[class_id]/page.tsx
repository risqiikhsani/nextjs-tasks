import Course from "@/app/(home)/_components/Course/course";
import MenuWrapper from "@/components/menu-wrapper";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ConvertDate } from "@/lib/convert-date";
import { Class as ClassType } from "@prisma/client";
import DeleteForm from "../delete-form";
import UpdateForm from "../update-form";

const URL = process.env.NEXT_PUBLIC_API_URL;
export default async function Page({
  params,
}: {
  params: Promise<{ class_id: string }>;
}) {
  const class_id = (await params).class_id;

  const response = await fetch(`${URL}/api/classes/${class_id}`);
  const data: ClassType = await response.json();

  return (
    <div className="flex flex-col gap-2">
      Class Detail
      <Card>
            <CardHeader>
              <div className="bg-green-500 p-2">Class</div>
              <h1 className="text-4xl font-bold">{data.name}</h1>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{data.description}</p>
              <div>
                <Badge>Creator</Badge> {data.creatorId}
              </div>
              <div>
                <Badge>Created</Badge> {ConvertDate(data.createdAt)}
              </div>
              <div>
                <Badge>Last Updated</Badge> {ConvertDate(data.updatedAt)}
              </div>
            </CardContent>
            <CardFooter>
              <MenuWrapper>
                <UpdateForm data={data} />
                <DeleteForm data={data} />
              </MenuWrapper>
            </CardFooter>
          </Card>
      <Course class_id={class_id} />
    </div>
  );
}
