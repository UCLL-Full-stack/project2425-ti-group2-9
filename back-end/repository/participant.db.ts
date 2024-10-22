import { Participant } from "../model/participant";
import { User } from "../model/user";

const participants : Participant[] = [];

const createParticipant = ({
    user,
    dateOfBirth,
}: {
    user: User;
    dateOfBirth: Date;
    events?: Event[];
}): Participant => {
    const participant = new Participant({
        user,
        dateOfBirth,
    });

    participants.push(participant);
    return participant;
};

const getAllParticipants = (): Participant[]=> participants

const getParticipantById = ({ id }: {id: number}): Participant | null => {
    try {
        return participants.find((participant) => participant.getId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getParticipantByUserId = ({id}:{id:number}): Participant | undefined => {
    try {
        return participants.find(participant => participant.getUser().getId() === id);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
    
};
    

export default {
    createParticipant,
    getAllParticipants,
    getParticipantById,
    getParticipantByUserId,
};