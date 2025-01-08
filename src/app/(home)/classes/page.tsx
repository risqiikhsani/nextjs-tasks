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
import { Prisma } from "@prisma/client";
import Link from "next/link";
import CreateForm from "./create-form";
import DeleteForm from "./delete-form";
import UpdateForm from "./update-form";

const ClassWithCreatorType = Prisma.validator<Prisma.ClassDefaultArgs>()({
  include: { creator: true },
});
type ClassWithCreatorType = Prisma.ClassGetPayload<typeof ClassWithCreatorType>;

const URL = process.env.NEXT_PUBLIC_API_URL;

export default async function Page() {
  let data;

  try {
    const response = await fetch(`${URL}/api/classes`);
    data = (await response.json()) as ClassWithCreatorType[];
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="flex flex-col gap-2">
      <CreateForm />
      {data &&
        data.length > 0 &&
        data.map((a, i) => (
          <Card key={i}>
            <CardContent>
              <CardHeader>
                <CardTitle>{a.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Creator : {a.creator.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {ConvertDate(a.createdAt)}
                </p>
              </CardHeader>
              {a.description}
            </CardContent>
            <CardFooter className="flex gap-2 justify-end">
              <Button asChild variant="outline">
                <Link href={`/classes/${a.id}`}>Detail</Link>
              </Button>
              <MenuWrapper>
                <UpdateForm data={a} />
                <DeleteForm data={a} />
              </MenuWrapper>
            </CardFooter>
          </Card>
        ))}
      {!data && "No classes found."}
    </div>
  );
}
