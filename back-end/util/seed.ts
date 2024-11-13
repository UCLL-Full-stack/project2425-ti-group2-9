// Execute: npx ts-node util/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.speaker.deleteMany();
    await prisma.organizer.deleteMany();
    await prisma.user.deleteMany();

    // Dummy User instances for speakers
    const user1 = await prisma.user.create({
        data: {
            username: "alice123",
            password: await bcrypt.hash("password1", 10),
            firstName: "Alice",
            lastName: "Smith",
            email: "alice@example.com",
        },
    });

    const user2 = await prisma.user.create({
        data: {
            username: "bob456",
            password: await bcrypt.hash("password2", 10),
            firstName: "Bob",
            lastName: "Jones",
            email: "bob@example.com",
        },
    });

    const user3 = await prisma.user.create({
        data: {
            username: "charlie789",
            password: await bcrypt.hash("password3", 10),
            firstName: "Charlie",
            lastName: "Brown",
            email: "charlie@example.com",
        },
    });

    // Seed speakers with dummy data
    const speakers = [
        { userId: user1.id, expertise: "AI and Machine Learning" },
        { userId: user2.id, expertise: "Cybersecurity" },
        { userId: user3.id, expertise: "Cloud Computing" },
    ];

    for (const speakerData of speakers) {
        await prisma.speaker.create({
            data: speakerData,
        });
    }

    // Dummy User instances for organizers
    const organizerUser1 = await prisma.user.create({
        data: {
            username: "organizer1",
            password: await bcrypt.hash("organizer1pass", 10),
            firstName: "Olivia",
            lastName: "Williams",
            email: "olivia@example.com",
        },
    });

    const organizerUser2 = await prisma.user.create({
        data: {
            username: "organizer2",
            password: await bcrypt.hash("organizer2pass", 10),
            firstName: "Liam",
            lastName: "Johnson",
            email: "liam@example.com",
        },
    });

    // Seed organizers with dummy data
    const organizers = [
        { userId: organizerUser1.id, companyName: "Tech Innovations Ltd." },
        { userId: organizerUser2.id, companyName: "Cyber Solutions Inc." },
    ];

    for (const organizerData of organizers) {
        await prisma.organizer.create({
            data: organizerData,
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
