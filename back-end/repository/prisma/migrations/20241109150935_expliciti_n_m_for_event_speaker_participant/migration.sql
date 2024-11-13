/*
  Warnings:

  - You are about to drop the `_EventToParticipant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventToSpeaker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EventToParticipant" DROP CONSTRAINT "_EventToParticipant_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToParticipant" DROP CONSTRAINT "_EventToParticipant_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventToSpeaker" DROP CONSTRAINT "_EventToSpeaker_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToSpeaker" DROP CONSTRAINT "_EventToSpeaker_B_fkey";

-- DropTable
DROP TABLE "_EventToParticipant";

-- DropTable
DROP TABLE "_EventToSpeaker";

-- CreateTable
CREATE TABLE "EventParticipant" (
    "eventId" INTEGER NOT NULL,
    "participantId" INTEGER NOT NULL,

    CONSTRAINT "EventParticipant_pkey" PRIMARY KEY ("eventId","participantId")
);

-- CreateTable
CREATE TABLE "EventSpeaker" (
    "eventId" INTEGER NOT NULL,
    "speakerId" INTEGER NOT NULL,

    CONSTRAINT "EventSpeaker_pkey" PRIMARY KEY ("eventId","speakerId")
);

-- AddForeignKey
ALTER TABLE "EventParticipant" ADD CONSTRAINT "EventParticipant_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventParticipant" ADD CONSTRAINT "EventParticipant_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSpeaker" ADD CONSTRAINT "EventSpeaker_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSpeaker" ADD CONSTRAINT "EventSpeaker_speakerId_fkey" FOREIGN KEY ("speakerId") REFERENCES "Speaker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
