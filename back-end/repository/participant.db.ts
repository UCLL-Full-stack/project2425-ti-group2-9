import { Participant } from "../model/participant";
import database from "./database";
import { User } from "../model/user";


// const createParticipant = ({
//     user,
//     dateOfBirth,
// }: {
//     user: User;
//     dateOfBirth: Date;
//     events?: Event[];
// }): Participant => {
//     const participant = new Participant({
//         user,
//         dateOfBirth,
//     });

//     participants.push(participant);
//     return participant;
// };

const getAllParticipants = async(): Promise<Participant[]> => {
    try {
        const participantPrisma = await database.participant.findMany({
            include: {
                user: true
            }
        });
        return participantPrisma.map((participantPrisma)=>Participant.from(participantPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getParticipantById = async ({ id }: {id: number}): Promise<Participant | null> => {
    try {
        const participantPrisma = await database.participant.findUnique({
            where: {id},
            include: {
                user: true
            }
        });
        if(participantPrisma){
            return Participant.from(participantPrisma);
        }else{
            return null;
        }
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// const getParticipantByUserId = ({id}:{id:number}): Participant | undefined => {
//     try {
//         return participants.find(participant => participant.getUser().getId() === id);
//     } catch (error) {
//         console.error(error);
//         throw new Error('Database error. See server log for details.');
//     }
    
// };
    

export default {
    //createParticipant,
    getAllParticipants,
    getParticipantById,
    //getParticipantByUserId,
};