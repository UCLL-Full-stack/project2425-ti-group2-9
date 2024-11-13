import { User } from "./user";
import { Event } from "./event";
import { Participant  as ParticipantPrisma, User as UserPrisma} from '@prisma/client'

export class Participant {
    private id?: number;
    private user: User;
    private dateOfBirth: Date;
    //private events?: Event[];
    private createdAt?: Date;
    private updatedAt?: Date;

    constructor(participant: {
        id?: number;
        user: User;
        dateOfBirth: Date;
        //events?: Event[];
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        this.validate(participant);

        this.id = participant.id;
        this.user = participant.user;
        this.dateOfBirth = participant.dateOfBirth;
        //this.events = participant.events;
        this.createdAt = participant.createdAt;
        this.updatedAt = participant.updatedAt;
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

    // getEvents(): Event[] | undefined {
    //     return this.events;
    // }

    getCreatedAt(): Date | undefined{
        return this.createdAt;
    }
    
    getUpdatedAt(): Date | undefined{
        return this.updatedAt;
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
            //this.events === participant.getEvents()
            this.createdAt === participant.getCreatedAt() &&
            this.updatedAt === participant.getUpdatedAt()
        );
    }

    static from({
        id,
        user,
        dateOfBirth,
        //events,
        createdAt,
        updatedAt,
    }: ParticipantPrisma & {user: UserPrisma;}){
        return new Participant({
            id,
            user: User.from(user),
            dateOfBirth,
            createdAt,
            updatedAt,
        });
    }
    
}