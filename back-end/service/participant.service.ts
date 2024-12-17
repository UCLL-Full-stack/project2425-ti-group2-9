import { promiseHooks } from "v8";
import { Participant } from "../model/participant";
import participantDb from "../repository/participant.db";
//import userDb from "../repository/user.db";
import { ParticipantInput } from "../types";

const getAllParticipants = async (): Promise<Participant[]> => {
    return await participantDb.getAllParticipants();
};

const getParticipantByUserName = async ({ username }: { username: string }): Promise<Participant> => {
    const participant = await participantDb.getParticipantByUsername({ username });
    
    if (!participant) {
        throw new Error(`Participant with username ${username} not found`);
    }
    
    return participant; 
};

export default{ getAllParticipants, getParticipantByUserName};