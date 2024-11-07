import { Event } from "./event";
import { User } from "./user";
import {
    Organizer as OrganizerPrisma,
    Event as EventPrisma, 
    User as UserPrisma
}from '@prisma/client'
export class Organizer {
    private id?: number;
    private user: User;
    private companyName: string;
    private createdAt?: Date;
    private updatedAt?: Date;

    constructor(organizer: {
        id?: number,
        user: User,
        companyName: string,
        events?: Event[]
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        this.validate(organizer);

        this.id = organizer.id;
        this.user = organizer.user;
        this.companyName = organizer.companyName;
        this.createdAt = organizer.createdAt;
        this.updatedAt = organizer.updatedAt;
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

    getCreatedAt(): Date | undefined {
        return this.createdAt;
    }

    getUpdatedAt(): Date | undefined {
        return this.updatedAt;
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
            this.createdAt === organizer.getCreatedAt() &&
            this.updatedAt === organizer.getUpdatedAt()
        );
    }

    static from({
        id,
        companyName,
        user,
        createdAt,
        updatedAt
    }:OrganizerPrisma & {user: UserPrisma;}) {
        return new Organizer({
            id,
            companyName,
            user: User.from(user),
            createdAt,
            updatedAt
        });
    }
    
    
}
