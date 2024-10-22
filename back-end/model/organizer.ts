import { Event } from "./event";
import { User } from "./user";

export class Organizer {
    private id?: number;
    private user: User;
    private companyName: string;
    private events?: Event[];

    constructor(organizer: {
        id?: number,
        user: User,
        companyName: string,
        events?: Event[]
    }) {
        this.validate(organizer);

        this.id = organizer.id;
        this.user = organizer.user;
        this.companyName = organizer.companyName;
        this.events = organizer.events;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    getCompanyName(): string {
        return this.companyName;
    }

    getEvents(): Event[] | undefined{
        return this.events;
    }

    validate(organizer: { companyName: string, user: User }) {
        if (organizer.companyName === undefined || organizer.companyName.trim() === "") {
            throw new Error("Company name is required");
        }
        if (organizer.user === undefined) {
            throw new Error("User is required");
        }
    }

    eaquals(organizer: Organizer): boolean {
        return (
            this.companyName === organizer.getCompanyName() &&
            this.user === organizer.getUser() &&
            this.events === organizer.getEvents()
        );
    }
}