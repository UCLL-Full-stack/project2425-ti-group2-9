/*
  Warnings:

  - You are about to drop the column `experise` on the `Speaker` table. All the data in the column will be lost.
  - Added the required column `expertise` to the `Speaker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Speaker" DROP COLUMN "experise",
ADD COLUMN     "expertise" TEXT NOT NULL;
