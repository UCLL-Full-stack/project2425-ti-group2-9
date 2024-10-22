import { Organizer } from "./organizer";
import { Speaker } from "./speaker";
import { Participant } from "./participant";

export class Event {
    private id?: number;
    private name: string;
    private description: string;
    private category: string;
    private startDate: Date;
    private endDate: Date;
    private organizer: Organizer;
    private speakers: Speaker[];
    private participants?: Participant[];

    constructor(event: {
        id?: number;
        name: string;
        description: string;
        category: string;
        startDate: Date;
        endDate: Date;
        organizer: Organizer;
        speakers: Speaker[];
        participants?: Participant[];
    }){
        this.validate(event);

        this.id = event.id;
        this.name = event.name;
        this.description = event.description;
        this.category = event.category;
        this.startDate = event.startDate;
        this.endDate = event.endDate;
        this.organizer = event.organizer;
        this.speakers = event.speakers;
        this.participants = event.participants;
    }

    getId(): number | undefined{
        return this.id;
    }

    getName(): string{
        return this.name;
    }
    
    getDescription(): string{
        return this.description;
    }
    
    getCategory(): string{
        return this.category;
    }
    
    getStartDate(): Date{
        return this.startDate;
    }
    
    getEndDate(): Date{
        return this.endDate;
    }

    getOrganizer(): Organizer{
        return this.organizer;
    }

    getSpeakers(): Speaker[]{
        return this.speakers;
    }

    getParticipants(): Participant[] | undefined{
        return this.participants;
    }

    validate(event: { name: string, description: string, category: string, startDate: Date, endDate: Date, organizer: Organizer, speakers: Speaker[], participants?: Participant[] }): void {
        if(typeof event.name!=='string' || event.name.trim().length === 0){
            throw new Error('Event name is required');
        }
        if(typeof event.description!=='string' || event.description.trim().length === 0){
            throw new Error('Event description is required');
        }
        if(event.startDate > event.endDate){
            throw new Error('Start date and end date should be valid and the start date should be earlier than the end date');
        }
    }

    equals(event: Event): boolean{
        return ( 
            this.id === event.getId() &&
            this.name === event.getName() &&
            this.description === event.getDescription() &&
            this.category === event.getCategory() &&
            this.startDate === event.getStartDate() &&
            this.endDate === event.getEndDate() &&
            this.organizer === event.getOrganizer() &&
            this.speakers === event.getSpeakers() &&
            this.participants === event.getParticipants()
        );
    }
}