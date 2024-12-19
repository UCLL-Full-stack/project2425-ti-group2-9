import { Participant } from "../model/participant";
import database from "./database";
import { User } from "../model/user";

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

const getParticipantByUsername = async ({username}:{username: string}): Promise<Participant | null> => {
    try {
        const participantPrisma = await database.participant.findFirst({
            where: {
                user: {
                    username: username,
                },
            },
            include: {
                user: true,
            },
        });

        if (!participantPrisma) {
            throw new Error(`No participant found with username: ${username}`);
        }

        return Participant.from(participantPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

    

export default {
    //createParticipant,
    getAllParticipants,
    getParticipantById,
    getParticipantByUsername
    //getParticipantByUserId,
};