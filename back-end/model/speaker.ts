import { Event } from "./event";
import { User } from "./user";
import { Speaker as SpeakerPrisma, User as UserPrisma } from '@prisma/client'

export class Speaker {
    private id?: number;
    private user: User;
    private expertise: string;
    //private events?: Event[];
    private createdAt?: Date;
    private updatedAt?: Date;

    constructor(speaker: {
        id?: number;
        user: User;
        expertise: string;
        //events?: Event[];
        createdAt?: Date;
        updatedAt?: Date;
        
    }) {
        this.validate(speaker);

        this.id = speaker.id;
        this.user = speaker.user;
        this.expertise = speaker.expertise;
        //this.events = speaker.events;
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

    validate(speaker: { user: User; expertise: string }) {
        if (!speaker.user) {
            throw new Error("User is required");
        }
        if (!speaker.expertise) {
            throw new Error("Expertise is required");
        }
    }

    // getEvents(): Event[] | undefined {
    //     return this.events;
    // }

    getCreatedAt(): Date | undefined {
        return this.createdAt;
    }

    getUpdatedAt(): Date | undefined {
        return this.updatedAt;
    }
    
    

    equals(speaker: Speaker): boolean {
        return (
            this.id === speaker.getId() &&
            this.user === speaker.getUser() &&
            this.expertise === speaker.getExpertise() &&
            //this.events === speaker.getEvents()
            this.createdAt === speaker.getCreatedAt() &&
            this.updatedAt === speaker.getUpdatedAt()
        );
    }

    static from({
        id, 
        user,
        expertise,
        //events,
        createdAt,
        updatedAt,
    }:SpeakerPrisma & {user: UserPrisma;}){
        return new Speaker({
            id,
            user: User.from(user),
            expertise,
            createdAt,
            updatedAt,
        });
    }
}