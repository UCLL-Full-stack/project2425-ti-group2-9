// Execute: npx ts-node util/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.speaker.deleteMany();
    await prisma.organizer.deleteMany();
    await prisma.user.deleteMany();

    const admin = await prisma.user.create({
        data: {
            username: 'admin',
            password: await bcrypt.hash('admin123', 12),
            firstName: 'admin',
            lastName: 'admin',
            email: 'administration@ucll.be',
            role: 'admin',
        },
    });

    // Dummy User instances for speaker
    const fransSpeaker = await prisma.user.create({
        data: {
            username: "frans",
            password: await bcrypt.hash("frans123", 12),
            firstName: "Frans",
            lastName: "Spreker",
            email: "frans@example.com",
            role: "speaker",
        },
    });

    //dummy User for organizer
    const janOrganizer = await prisma.user.create({
        data: {
            username: "jan",
            password: await bcrypt.hash("jan123", 12),
            firstName: "Jan",
            lastName: "Organisator",
            email: "jan@example.com",
            role: "organizer",
        },
    });

    const fritsParticipant = await prisma.user.create({
        data: {
            username: "frits",
            password: await bcrypt.hash("frits123", 12),
            firstName: "Frits",
            lastName: "Bezoeker",
            email: "frits@example.com",
            role: "participant",
        },
    });

    // Seed speakers with dummy data
    const speakers = [
        { userId: fransSpeaker.id, expertise: "AI and Machine Learning" },
    ];

    for (const speakerData of speakers) {
        await prisma.speaker.create({
            data: speakerData,
        });
    }

    // Seed organizers with dummy data
    const organizers = [
        { userId: janOrganizer.id, companyName: "Tech Innovations Ltd." },
    ];

    for (const organizerData of organizers) {
        await prisma.organizer.create({
            data: organizerData,
        });
    }

    const participants = [
        {
            userId: fritsParticipant.id,
            dateOfBirth: new Date("1990-01-01"), // Example date of birth
        },
    ];
    
    for (const participantData of participants) {
        await prisma.participant.create({
            data: participantData,
        });
    }

    console.log("Seeding completed!");
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error("Error seeding data:", error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
