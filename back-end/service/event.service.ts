import { Event } from "../model/event";
import { Organizer } from "../model/organizer";
import { Participant } from "../model/participant";
import { Speaker } from "../model/speaker";
import eventDb from "../repository/event.db";
import organizerDb from "../repository/organizer.db";
import participantDb from "../repository/participant.db";
import speakerDb from "../repository/speaker.db";
import { EventInput, OrganizerInput, SpeakerInput } from "../types";


const createEvent = async ({
    name,
    description,
    category,
    startDate,
    endDate,
    organizer: organizerInput,
    speakers: speakerInputs,
    participants:participantInputs,
}: EventInput): Promise<Event> => {

    if (!organizerInput?.id) {
        throw new Error("Organizer id is required");
    }
    const organizer = await organizerDb.getOrganizerById({ id: organizerInput.id });
    if (!organizer) {
        throw new Error(`Organizer with id ${organizerInput.id} not found`);
    }

    const speakers = [];
    for (const speakerInput of speakerInputs) {
        if (!speakerInput?.id) {
            throw new Error("Speaker id is required");
        }
        const getSpeaker = await speakerDb.getSpeakerById({ id: speakerInput.id });
        if(getSpeaker) {
            speakers.push(getSpeaker);
        }
    }

    const participants = [];
    if (participantInputs){
        for (const participantInput of participantInputs) {
            if (!participantInput?.id) {
                throw new Error("Participant id is required");
            }
            const getParticipant = await participantDb.getParticipantById({ id: participantInput.id });
            if(getParticipant) {
                participants.push(getParticipant);
            }
        }
    }
    const event = new Event({
        name,
        description,
        category,
        startDate,
        endDate,
        organizer,
        speakers,
        participants,
    })
    return await eventDb.createEvent(event);
};

const getAllEvents = async(): Promise<Event[]> => eventDb.getAllEvents();

const getEventById = (id: number) => {
    const event = eventDb.getEventById({ id });
    if (!event) {
        throw new Error(`Event with id ${id} not found`);
    }
    return event;
};

const getEventByName = async(name: string):Promise<Event> => {
    const event = await eventDb.getEventByName({ name });
    if (!event) {
        throw new Error(`Event with name ${name} not found`);
    }
    return event;
};

const getEventsByCategory = async(category: string): Promise<Event[]> => {
    const events = await eventDb.getEventsByCategory({category});
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
