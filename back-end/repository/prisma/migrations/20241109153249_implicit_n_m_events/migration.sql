/*
  Warnings:

  - You are about to drop the `EventParticipant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventSpeaker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventParticipant" DROP CONSTRAINT "EventParticipant_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventParticipant" DROP CONSTRAINT "EventParticipant_participantId_fkey";

-- DropForeignKey
ALTER TABLE "EventSpeaker" DROP CONSTRAINT "EventSpeaker_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventSpeaker" DROP CONSTRAINT "EventSpeaker_speakerId_fkey";

-- DropTable
DROP TABLE "EventParticipant";

-- DropTable
DROP TABLE "EventSpeaker";

-- CreateTable
CREATE TABLE "_EventToParticipant" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToSpeaker" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventToParticipant_AB_unique" ON "_EventToParticipant"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToParticipant_B_index" ON "_EventToParticipant"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToSpeaker_AB_unique" ON "_EventToSpeaker"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToSpeaker_B_index" ON "_EventToSpeaker"("B");

-- AddForeignKey
ALTER TABLE "_EventToParticipant" ADD CONSTRAINT "_EventToParticipant_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToParticipant" ADD CONSTRAINT "_EventToParticipant_B_fkey" FOREIGN KEY ("B") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToSpeaker" ADD CONSTRAINT "_EventToSpeaker_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToSpeaker" ADD CONSTRAINT "_EventToSpeaker_B_fkey" FOREIGN KEY ("B") REFERENCES "Speaker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
