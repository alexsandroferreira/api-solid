/*
  Warnings:

  - You are about to drop the column `role_test` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "role_test",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MEMBER';
