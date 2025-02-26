import OrgCard from "@/components/global/Orgs/org-card";
import Requests from "@/components/global/Requests/requests";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OrganizationType } from "@/types/types";
import Link from "next/link";

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
    <div className="flex flex-col gap-2">
      {data && <OrgCard data={data} detail={true} />}

      <div className="grid grid-cols-2 gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">User Join Requests</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>List of join requests</DialogTitle>
            </DialogHeader>
            <Requests organization_id={organization_id} />
          </DialogContent>
        </Dialog>

        <Button asChild variant="outline">
          <Link href={`/orgs/${organization_id}/users`}>Members</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={`/orgs/${organization_id}/classes`}>Classes</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={`/orgs/${organization_id}/qna`}>
            Questions & Answers (Q&A)
          </Link>
        </Button>
      </div>
    </div>
  );
}
