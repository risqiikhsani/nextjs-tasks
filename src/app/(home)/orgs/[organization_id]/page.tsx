import GetDataStore from "@/components/get-data-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OrganizationType } from "@/types/types";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Requests from "@/components/global/Requests/requests";

const URL = process.env.NEXT_PUBLIC_API_URL;

export default async function Page({
  params,
}: {
  params: Promise<{ organization_id: string }>;
}) {
  const organization_id = (await params).organization_id;

  const response = await fetch(`${URL}/api/orgs/${organization_id}`);
  const data: OrganizationType = await response.json();

  return (
    <div className="grid grid-cols-2 gap-2">
      <GetDataStore />

      {data && JSON.stringify(data)}

      <Dialog>
        <DialogTrigger>Requests</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>List of join requests</DialogTitle>
          </DialogHeader>
          <Requests organization_id={organization_id} />
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>List of users</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/users">See more</Link>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>All Classes</CardTitle>
          <CardDescription>List of classes</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/classes">See more</Link>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>My Classes</CardTitle>
          <CardDescription>List of classes</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/my-classes">See more</Link>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>My Tasks</CardTitle>
          <CardDescription>
            List of incomplete and completed tasks{" "}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/tasks">See more</Link>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
          <CardDescription>Graph of</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/submitted-tasks">See more</Link>
        </CardContent>
      </Card>
    </div>
  );
}
