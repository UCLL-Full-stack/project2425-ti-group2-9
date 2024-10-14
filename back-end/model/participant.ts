import { User } from "./user";
import { Event } from "./event";

export class Participant {
    private id?: number;
    private user: User;
    private dateOfBirth: Date;
    private events: Event[];

    constructor(participant: {
        id?: number;
        user: User;
        dateOfBirth: Date;
        events: Event[];
    }) {
        this.id = participant.id;
        this.user = participant.user;
        this.dateOfBirth = participant.dateOfBirth;
        this.events = participant.events;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    getDateOfBirth(): Date {
        return this.dateOfBirth;
    }

    getEvents(): Event[] {
        return this.events;
    }

    equals(participant: Participant): boolean {
        return (
            this.id === participant.getId() &&
            this.user === participant.getUser() &&
            this.dateOfBirth === participant.getDateOfBirth() &&
            this.events === participant.getEvents()
        );
    }
    
}