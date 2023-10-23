-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADIM', 'MEMBER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MEMBER';
