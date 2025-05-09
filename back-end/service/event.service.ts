import { UnauthorizedError } from "express-jwt";
import { Event } from "../model/event";
import eventDb from "../repository/event.db";
import organizerDb from "../repository/organizer.db";
import participantDb from "../repository/participant.db";
import speakerDb from "../repository/speaker.db";
import {Role,  EventInput, ParticipantInput,  OrganizerInput, SpeakerInput } from "../types";
import { Participant } from "../model/participant";
import { error } from "console";
import { eventNames } from "process";

import xss from "xss";

const createEvent = async ({
    name,
    description,
    category,
    startDate,
    endDate,
    organizer: organizerInput,
    speakers: speakerInputs,
    participants:participantInputs,
}: EventInput, user:{ username: string; role: Role }): Promise<Event> => {
    if(user.role !== 'admin' && user.role !== 'organizer'){
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this resource.',
        }); 
    }
    let organizer;
    if(user.role === 'organizer'){
        organizer = await organizerDb.getOrganizerByUsername({ username: user.username });
        if (!organizer) {
            throw new Error(`Organizer with username ${user.username} not found`);
        }   
    }
    else if (user.role === 'admin') {
        if (!organizerInput?.id) {
            throw new Error("Organizer id is required");
        }
        organizer = await organizerDb.getOrganizerById({ id: organizerInput.id });
        if (!organizer) {
            throw new Error(`Organizer not found`);
        }
    }
    
    if (!organizer) {
        throw new Error("Organizer could not be determined");
    }

    const speakers = [];
    for (const speakerInput of speakerInputs) {
        if (!speakerInput?.id) {
            throw new Error("Speaker id is required");
        }
        const getSpeaker = await speakerDb.getSpeakerById({ id: speakerInput.id });

        if(!getSpeaker) {
            throw new Error(`Speaker with id ${speakerInput.id} not found`);
        } else if(getSpeaker) {
            speakers.push(getSpeaker);
        }
    }

    const sanitizedName = xss(name);
    const sanitizedDescription = xss(description);
    const sanitizedCategory = xss(category);

    const event = new Event({
        name: sanitizedName,
        description: sanitizedDescription,
        category : sanitizedCategory,
        startDate,
        endDate,
        organizer,
        speakers,
    })
    return await eventDb.createEvent(event);
};

const addParticipantToEvent = async ({
    event: eventInput,
    username,
    role
   
}:{
    event: EventInput;
    username: string;
    role: Role 
    
}): Promise< Event | null> => {
    if(role === 'participant'){
        if(!eventInput.id) throw new Error("Event id is required");
        
        const event = await eventDb.getEventById({id:eventInput.id});
        if(!event) throw new Error('Events does not exist');

        const participant = await participantDb.getParticipantByUsername({username: username});
        if(!participant){
            throw new Error("Did not find participant")
        }
        event.addParticipantToEvent(participant);
        return await eventDb.updatePartcipantsofEvent({ event });
    }else{
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this resource.',
        });
    }    
};

const updateEvent = async({
    id,
    name,
    username,
    role,
}:{
    id: number;
    name: string;
    username: string;
    role: Role 
}): Promise<Event> => {
    if(role === 'admin' || role === 'organizer'){
        const event =  await eventDb.updateEventName({id, name})
        if(!name || name === ''){
            throw new Error('please give name')
        }
        if(!event){
            throw new Error("Updating event failed");
        }
        return event;       
    } else{
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this resource.',
        });
    }
}

const getAllEvents = async({username, role}:{username: string;role:Role}): Promise<Event[]> => {
    if(role === 'admin' || role === 'participant'){
        return eventDb.getAllEvents()
    }else if (role === 'organizer'){
        return eventDb.getEventsOfOrganizer({username});
    } else{
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this resource.',
        });
    }
    
};

const getEventById = (id: number): Promise<Event |null> => {
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
};

const deleteEvent = async ({id, username, role}
    :{id: number; username: string; role: Role}):Promise<Event | null> =>{
        if(role === 'organizer' || role==='admin'){
            return await eventDb.deleteEvent({id})
        }
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this resource.',
        });
        
}

export default {
    createEvent,
    getAllEvents,
    getEventById,
    getEventByName,
    getEventsByCategory,
    addParticipantToEvent,
    deleteEvent,
    updateEvent
};
