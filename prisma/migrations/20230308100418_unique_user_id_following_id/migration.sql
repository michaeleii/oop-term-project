/*
  Warnings:

  - A unique constraint covering the columns `[userId,followingId]` on the table `Follower` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Follower_userId_followingId_key" ON "Follower"("userId", "followingId");
