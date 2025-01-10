import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import MenuWrapper from "@/components/menu-wrapper";
import { ConvertDate } from "@/lib/convert-date";
import Link from "next/link";
import DeleteForm from "./delete-form";
import UpdateForm from "./update-form";
import { Badge } from "@/components/ui/badge";
import { ClassWithCreatorType } from "@/types/types";
import Join from "./join/join";

export default function ClassCard({
    data,
    detail = false, // Default value for `detail`
  }: {
    data: ClassWithCreatorType;
    detail?: boolean; // Make `detail` optional
  }) {
    return (
      <div>
        <Card>
          <CardContent>
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                {data.name}{" "}
                <span>
                  <Badge className="bg-green-400 p-2">Class</Badge>
                </span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Creator : {data.creator.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {ConvertDate(data.createdAt)}
              </p>
            </CardHeader>
            {data.description}
            {JSON.stringify(data)}
          </CardContent>
          <CardFooter className="flex gap-2 justify-end">
          <Join data={data}/>
            {!detail && (
              <Button asChild variant="outline">
                <Link href={`/classes/${data.id}`}>Detail</Link>
              </Button>
            )}
            <MenuWrapper>
              <UpdateForm data={data} />
              <DeleteForm data={data} />
            </MenuWrapper>
          </CardFooter>
        </Card>
      </div>
    );
  }
  