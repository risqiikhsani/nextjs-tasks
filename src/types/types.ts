import { Prisma } from "@prisma/client";

const OrganizationType = Prisma.validator<Prisma.OrganizationDefaultArgs>()({
  include: { creator: true },
});
export type OrganizationType = Prisma.OrganizationGetPayload<
  typeof OrganizationType
>;

const ClassType = Prisma.validator<Prisma.ClassDefaultArgs>()({
  include: { creator: true },
});
export type ClassType = Prisma.ClassGetPayload<
  typeof ClassType
>& {
  is_password: boolean;
};

const CourseType = Prisma.validator<Prisma.CourseDefaultArgs>()({
  include: { creator: true },
});
export type CourseType = Prisma.CourseGetPayload<
  typeof CourseType
>;

const TaskType = Prisma.validator<Prisma.TaskDefaultArgs>()({
  include: { creator: true },
});
export type TaskType = Prisma.TaskGetPayload<
  typeof TaskType
>;

const ClassEnrollmentType = Prisma.validator<Prisma.ClassEnrollmentDefaultArgs>()({
  include: { user: true,class:true },
});
export type ClassEnrollmentType = Prisma.ClassEnrollmentGetPayload<
  typeof ClassEnrollmentType
>;

const OrganizationMemberType = Prisma.validator<Prisma.OrganizationMemberDefaultArgs>()({
  include: { user: true,org:true },
});
export type OrganizationMemberType = Prisma.OrganizationMemberGetPayload<
  typeof OrganizationMemberType
>;

const JoinRequestType = Prisma.validator<Prisma.JoinRequestDefaultArgs>()({
  include: { user: true,org:true },
});
export type JoinRequestType = Prisma.JoinRequestGetPayload<
  typeof JoinRequestType
>;