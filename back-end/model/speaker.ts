import { Event } from "./event";
import { User } from "./user";

export class Speaker {
    private id?: number;
    private user: User;
    private expertise: string;
    private events?: Event[];

    constructor(speaker: {
        id?: number;
        user: User;
        expertise: string;
        events?: Event[];
    }) {
        this.validate(speaker);

        this.id = speaker.id;
        this.user = speaker.user;
        this.expertise = speaker.expertise;
        this.events = speaker.events;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    getExpertise(): string {
        return this.expertise;
    }

    validate(speaker: {user: User, expertise: string,}){
        if (!speaker.user) {
            throw new Error("User is required");
        }
        if (!speaker.expertise) {
            throw new Error("Expertise is required");
        }
    }

    getEvents(): Event[] | undefined {
        return this.events;
    }

    equals(speaker: Speaker): boolean {
        return (
            this.id === speaker.getId() &&
            this.user === speaker.getUser() &&
            this.expertise === speaker.getExpertise() &&
            this.events === speaker.getEvents()
        );
    }
}