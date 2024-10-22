import { User } from "./user";
import { Event } from "./event";

export class Participant {
    private id?: number;
    private user: User;
    private dateOfBirth: Date;
    private events?: Event[];

    constructor(participant: {
        id?: number;
        user: User;
        dateOfBirth: Date;
        events?: Event[];
    }) {
        this.validate(participant);

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

    getEvents(): Event[] | undefined {
        return this.events;
    }

    validate(participant: { user: User, dateOfBirth: Date }){
        if( !participant.user){
            throw new Error("User is required");
        }
        if( !participant.dateOfBirth){
            throw new Error("Date of birth is required");
        }
        if(participant.dateOfBirth > new Date()){
            throw new Error("Invalid date of birth");
        };
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