/*
  Warnings:

  - You are about to drop the column `message` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "message",
ADD COLUMN     "isadmin" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
