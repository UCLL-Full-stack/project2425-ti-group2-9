// Execute: npx ts-node util/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.speaker.deleteMany();
    await prisma.organizer.deleteMany();
    await prisma.participant.deleteMany();
    await prisma.user.deleteMany();
    await prisma.event.deleteMany();

    // Seed Users
    const admin = await prisma.user.create({
        data: {
            username: 'admin',
            password: await bcrypt.hash('Admin123', 12),
            firstName: 'admin',
            lastName: 'admin',
            email: 'administration@ucll.be',
            role: 'admin',
        },
    });

    const fransSpeaker = await prisma.user.create({
        data: {
            username: "frans",
            password: await bcrypt.hash("Frans123", 12),
            firstName: "Frans",
            lastName: "Spreker",
            email: "frans@example.com",
            role: "speaker",
        },
    });

    const mariaSpeaker = await prisma.user.create({
        data: {
            username: "maria",
            password: await bcrypt.hash("Maria123", 12),
            firstName: "Maria",
            lastName: "Spreker",
            email: "maria@example.com",
            role: "speaker",
        },
    });

    const johnSpeaker = await prisma.user.create({
        data: {
            username: "john",
            password: await bcrypt.hash("John123", 12),
            firstName: "John",
            lastName: "Spreker",
            email: "john@example.com",
            role: "speaker",
        },
    });

    const janOrganizer = await prisma.user.create({
        data: {
            username: "jan",
            password: await bcrypt.hash("JanOrg123", 12),
            firstName: "Jan",
            lastName: "Organisator",
            email: "jan@example.com",
            role: "organizer",
        },
    });

    const lisaOrganizer = await prisma.user.create({
        data: {
            username: "lisa",
            password: await bcrypt.hash("lisa123", 12),
            firstName: "Lisa",
            lastName: "Organisator",
            email: "lisa@example.com",
            role: "organizer",
        },
    });

    const tomOrganizer = await prisma.user.create({
        data: {
            username: "tom",
            password: await bcrypt.hash("tom123", 12),
            firstName: "Tom",
            lastName: "Organisator",
            email: "tom@example.com",
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

    // Seed Speakers
    const speakers = [
        await prisma.speaker.create({ data: { userId: fransSpeaker.id, expertise: "AI and Machine Learning" } }),
        await prisma.speaker.create({ data: { userId: mariaSpeaker.id, expertise: "Cybersecurity" } }),
        await prisma.speaker.create({ data: { userId: johnSpeaker.id, expertise: "Cloud Computing" } }),
    ];

    // Seed Organizers
    const organizers = [
        await prisma.organizer.create({ data: { userId: janOrganizer.id, companyName: "Tech Innovations Ltd." } }),
        await prisma.organizer.create({ data: { userId: lisaOrganizer.id, companyName: "Future Makers Inc." } }),
        await prisma.organizer.create({ data: { userId: tomOrganizer.id, companyName: "Creative Solutions Co." } }),
    ];

    // Seed Participants
    const participants = [
        await prisma.participant.create({ data: { userId: fritsParticipant.id, dateOfBirth: new Date("1990-01-01") } }),
    ];

    // Seed Events
    const events = [
        {
            name: "AI Conference 2024",
            description: "Explore the latest advancements in artificial intelligence.",
            category: "Technology",
            startDate: new Date("2025-01-01T10:00:00Z"),
            endDate: new Date("2025-01-02T16:00:00Z"),
            organizerId: organizers[0].id,
            speakers: { connect: [{ id: speakers[0].id }, { id: speakers[1].id }] },
            participants: { connect: [{ id: participants[0].id }] },
        },
        {
            name: "Cloud Summit",
            description: "Discuss the future of cloud computing and its applications.",
            category: "Technology",
            startDate: new Date("2024-02-15T09:00:00Z"),
            endDate: new Date("2024-02-15T17:00:00Z"),
            organizerId: organizers[1].id,
            speakers: { connect: [{ id: speakers[1].id }, { id: speakers[2].id }] },
            participants: { connect: [{ id: participants[0].id }] },
        },
        {
            name: "Cybersecurity Workshop",
            description: "Hands-on training in securing modern systems.",
            category: "Technology",
            startDate: new Date("2025-04-10T10:00:00Z"),
            endDate: new Date("2025-04-10T20:00:00Z"),
            organizerId: organizers[2].id,
            speakers: { connect: [{ id: speakers[0].id }] },
            participants: { connect: [{ id: participants[0].id }] },
        },
    ];

    for (const event of events) {
        await prisma.event.create({ data: event });
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
