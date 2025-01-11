-- CreateEnum
CREATE TYPE "EnrollmentRole" AS ENUM ('CREATOR', 'MEMBER');

-- AlterTable
ALTER TABLE "ClassEnrollment" ADD COLUMN     "role" "EnrollmentRole" NOT NULL DEFAULT 'MEMBER';
