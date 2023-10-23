/*
  Warnings:

  - You are about to drop the column `descripntion` on the `gyms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gyms" DROP COLUMN "descripntion",
ADD COLUMN     "description" TEXT;
