import database from './database';
import { Event } from "../model/event";
import { nextDay } from 'date-fns';

const createEvent = async (event: Event): Promise<Event> => {
    try {
        const createdEvent = await database.event.create({
            data: {
                name: event.getName(),
                description: event.getDescription(),
                category: event.getCategory(),
                startDate: event.getStartDate(),
                endDate: event.getEndDate(),
                organizer: {
                    connect: { id: event.getOrganizer().getId() },
                },
                speakers: {
                    connect: event.getSpeakers().map((speaker) => ({ id: speaker.getId() })),
                },
                participants: {
                    connect: event.getParticipants()?.map((participant) => ({ id: participant.getId() })),
                },
            },
            include: {
                organizer: { include: { user: true } },
                speakers: { include: { user: true } },
                participants: { include: { user: true } },
            },
        });

        return Event.from(createdEvent);
    } catch (error) {
        console.error('Error creating event:', error);
        throw new Error('Database error. See server log for details.');
    }
};

const getEventById = async ({id}:{id:number}): Promise<Event | null> => {
    try {
        const eventPrisma = await database.event.findUnique({
            where: { id },
            include: {
                organizer: { include: { user: true } },
                speakers:{include: {user: true } },
                participants: {include: {user: true } },
            },
        });

        if(eventPrisma) {
            return Event.from(eventPrisma);
        }else{
            return null;
        }
    } catch (error) {
        console.error('Error retrieving event by ID:', error);
        throw new Error('Database error. See server log for details.');
    }
};

const getEventsByCategory = async ({category}:{category: string}): Promise<Event[]> => {
    try {
        const eventsPrisma = await database.event.findMany({
            where: { category },
            include: {
                organizer: { include: { user: true } },
                speakers: { include: { user: true } },
                participants: { include: { user: true } },
            },
        });
        if (eventsPrisma) {
            return eventsPrisma.map((prismaEvent) => Event.from(prismaEvent));
        }else {
            return [];
        }
    } catch (error) {
        console.error('Error retrieving events by category:', error);
        throw new Error('Database error. See server log for details.');
    }
}

const getEventByName = async({ name }: {name: string}): Promise<Event | null> => {
    try {
        const eventPrisma = await database.event.findFirst({
            where: { name },
            include: {
                organizer: { include: { user: true } },
                speakers: { include: { user: true } },
                participants: { include: { user: true } },
            },
        });
        if (eventPrisma) {
            return Event.from(eventPrisma);
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getAllEvents = async (): Promise<Event[]> => {
    try {
        const eventsPrisma = await database.event.findMany({
            include: {
                organizer: { include: { user: true } },
                speakers: { include: { user: true } },
                participants: { include: { user: true } },
            },
        });

        return eventsPrisma.map((prismaEvent) => Event.from(prismaEvent));
    } catch (error) {
        console.error('Error retrieving all events:', error);
        throw new Error('Database error. See server log for details.');
    }
};

const deleteEvent = async (eventId: number): Promise<boolean> => {
    try {
        const event = await database.event.findUnique({ where: { id: eventId } });
        if (!event) return false;

        await database.event.delete({ where: { id: eventId } });
        return true;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createEvent,
    getEventById,
    getAllEvents,
    deleteEvent,
    getEventsByCategory,
    getEventByName,
};
