import { Event } from "../model/event";
import { Organizer } from "../model/organizer";
import { Speaker } from "../model/speaker";
import { Participant } from "../model/participant";

const events: Event[] = [];

const createEvent = ({
    id,
    name,
    description,
    category,
    startDate,
    endDate,
    organizer,
    speakers,
    participants
}: {
    id?: number;
    name: string;
    description: string;
    category: string;
    startDate: Date;
    endDate: Date;
    organizer: Organizer;
    speakers: Speaker[];
    participants?: Participant[];
}): Event => {
    const event = new Event({
        id,
        name,
        description,
        category,
        startDate,
        endDate,
        organizer,
        speakers,
        participants,
    });

    events.push(event);
    return event;
};

const getAllEvents = (): Event[] => events;

const getEventById = ({ id }: { id: number }): Event | null => {
    try {
        return events.find((event) => event.getId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getEventByName = ({ name }: {name: string}): Event | null => {
    try {
        return events.find((event) => event.getName() === name) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getEventsByCategory = ({ category }: { category: string }): Event[] | null=> {
    try {
        return events.filter((event) => event.getCategory() === category);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getEventsByOrganizerId = ({ id }: { id: number }): Event[] => {
    try {
        return events.filter((event) => event.getOrganizer().getId() === id);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getEventsBySpeakerId = ({ id }: { id: number }): Event[] => {
    try {
        return events.filter((event) =>
            event.getSpeakers().some((speaker) => speaker.getId() === id)
        );
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createEvent,
    getAllEvents,
    getEventById,
    getEventsByOrganizerId,
    getEventsBySpeakerId,
    getEventByName,
    getEventsByCategory
};
