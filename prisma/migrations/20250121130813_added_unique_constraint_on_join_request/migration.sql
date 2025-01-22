/*
  Warnings:

  - A unique constraint covering the columns `[userId,orgId]` on the table `JoinRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "JoinRequest_userId_orgId_key" ON "JoinRequest"("userId", "orgId");
