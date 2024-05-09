-- AlterTable
ALTER TABLE "userProfiles" ADD COLUMN     "badges" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 0;
