import { Event } from "../model/event";
import eventDb from "../repository/event.db";
import organizerDb from "../repository/organizer.db";
import speakerDb from "../repository/speaker.db";
import { EventInput } from "../types";

const createEvent = ({
    name,
    description,
    category,
    startDate,
    endDate,
    organizer: organizerInput,
    speakers: speakerInputs,
    participants,
}: EventInput): Event => {

    if (!organizerInput?.id) {
        throw new Error("Organizer id is required");
    }

    const organizer = organizerDb.getOrganizerById({ id: organizerInput.id });
    if (!organizer) {
        throw new Error("Organizer not found");
    }

    const speakers = speakerInputs.map(speakerInput => {
        if (!speakerInput?.id) {
            throw new Error("Speaker id is required");
        }

        const speaker = speakerDb.getSpeakerById({ id: speakerInput.id });
        if (!speaker) {
            throw new Error(`Speaker with id ${speakerInput.id} not found`);
        }

        return speaker;
    });

    const event = {
        name,
        description,
        category,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        organizer,
        speakers,
        participants: [],
    };

    return eventDb.createEvent(event);
};

const getAllEvents = () => {
    return eventDb.getAllEvents();
};

const getEventById = (id: number) => {
    const event = eventDb.getEventById({ id });
    if (!event) {
        throw new Error(`Event with id ${id} not found`);
    }
    return event;
};

const getEventByName = (name: string) => {
    const event = eventDb.getEventByName({ name });
    if (!event) {
        throw new Error(`Event with name ${name} not found`);
    }
    return event;
};

const getEventsByCategory = (category: string) => {
    const events = eventDb.getEventsByCategory({category});
    if (!events || events.length === 0) {
        throw new Error(`No events found in category ${category}`);
    }
    return events;
}

export default {
    createEvent,
    getAllEvents,
    getEventById,
    getEventByName,
    getEventsByCategory,
};
