import Courses from "@/components/global/Course/courses";

import { ClassType } from "@/types/types";
import ClassCard from "@/components/global/Class/class-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Enrollments from "@/components/global/Enrollments/enrollments";
import { Button } from "@/components/ui/button";
import { PersonStandingIcon } from "lucide-react";
import GuardByClassEnrollmentRole from "@/components/GuardByClassEnrollmentRole";

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
    <div>
      {data ? (
        <div className="flex flex-col gap-2">
          <ClassCard data={data} detail />
          <GuardByClassEnrollmentRole
            allowed_roles={["CREATOR", "MEMBER"]}
            class_id={data.id}
          >
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PersonStandingIcon />
                  Members
                </Button>
              </DialogTrigger>
              <DialogContent
                className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}
              >
                <DialogHeader>
                  <DialogTitle>List of members enrolled</DialogTitle>
                </DialogHeader>
                <Enrollments class_id={class_id} />
              </DialogContent>
            </Dialog>
            <Courses class_id={class_id} />
          </GuardByClassEnrollmentRole>
        </div>
      ) : (
        <p>No data found</p>
      )}
    </div>
  );
}
