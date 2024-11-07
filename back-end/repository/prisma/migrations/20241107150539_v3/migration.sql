/*
  Warnings:

  - You are about to drop the column `name` on the `Organizer` table. All the data in the column will be lost.
  - Added the required column `companyName` to the `Organizer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organizer" DROP COLUMN "name",
ADD COLUMN     "companyName" TEXT NOT NULL;
