/*
  Warnings:

  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `userCode` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customerPayments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `domains` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `members` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verificationTokens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workspaces` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_userId_fkey";

-- DropForeignKey
ALTER TABLE "customerPayments" DROP CONSTRAINT "customerPayments_customerId_fkey";

-- DropForeignKey
ALTER TABLE "domains" DROP CONSTRAINT "domains_addedById_fkey";

-- DropForeignKey
ALTER TABLE "domains" DROP CONSTRAINT "domains_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "members" DROP CONSTRAINT "members_email_fkey";

-- DropForeignKey
ALTER TABLE "members" DROP CONSTRAINT "members_inviter_fkey";

-- DropForeignKey
ALTER TABLE "members" DROP CONSTRAINT "members_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userId_fkey";

-- DropForeignKey
ALTER TABLE "workspaces" DROP CONSTRAINT "workspaces_creatorId_fkey";

-- DropIndex
DROP INDEX "users_userCode_email_key";

-- DropIndex
DROP INDEX "users_userCode_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "emailVerified",
DROP COLUMN "image",
DROP COLUMN "updatedAt",
DROP COLUMN "userCode",
ALTER COLUMN "email" SET NOT NULL;

-- DropTable
DROP TABLE "accounts";

-- DropTable
DROP TABLE "customerPayments";

-- DropTable
DROP TABLE "domains";

-- DropTable
DROP TABLE "members";

-- DropTable
DROP TABLE "sessions";

-- DropTable
DROP TABLE "verificationTokens";

-- DropTable
DROP TABLE "workspaces";

-- DropEnum
DROP TYPE "InvitationStatus";

-- DropEnum
DROP TYPE "SubscriptionType";

-- DropEnum
DROP TYPE "TeamRole";

-- CreateTable
CREATE TABLE "userProfiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "healthGoals" TEXT,
    "dietaryPreferences" TEXT,

    CONSTRAINT "userProfiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userProfiles_userId_key" ON "userProfiles"("userId");

-- AddForeignKey
ALTER TABLE "userProfiles" ADD CONSTRAINT "userProfiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
