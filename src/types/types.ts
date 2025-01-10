import { Prisma } from "@prisma/client";

const ClassWithCreatorType = Prisma.validator<Prisma.ClassDefaultArgs>()({
  include: { creator: true },
});
export type ClassWithCreatorType = Prisma.ClassGetPayload<
  typeof ClassWithCreatorType
>& {
  is_password: boolean;
};

const CourseWithCreatorType = Prisma.validator<Prisma.CourseDefaultArgs>()({
  include: { creator: true },
});
export type CourseWithCreatorType = Prisma.CourseGetPayload<
  typeof CourseWithCreatorType
>;

const TaskWithCreatorType = Prisma.validator<Prisma.TaskDefaultArgs>()({
  include: { creator: true },
});
export type TaskWithCreatorType = Prisma.TaskGetPayload<
  typeof CourseWithCreatorType
>;
