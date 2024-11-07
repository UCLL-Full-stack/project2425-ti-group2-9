/*
  Warnings:

  - You are about to drop the column `email` on the `Organizer` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Organizer` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Organizer_email_key";

-- AlterTable
ALTER TABLE "Organizer" DROP COLUMN "email",
DROP COLUMN "password";
