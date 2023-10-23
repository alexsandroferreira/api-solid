/*
  Warnings:

  - You are about to drop the column `descriotion` on the `gyms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gyms" DROP COLUMN "descriotion",
ADD COLUMN     "descripntion" TEXT;
