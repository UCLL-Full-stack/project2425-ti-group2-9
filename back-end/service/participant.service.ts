import { Participant } from "../model/participant";
import participantDb from "../repository/participant.db";
import userDb from "../repository/user.db";
import { ParticipantInput } from "../types";

const createParticipant = ({
    user: userInput,
    dateOfBirth,
}: ParticipantInput): Participant => {

    if(!userInput?.id){
        throw new Error("User id is required");
    }

    const existingParticipant = participantDb.getParticipantByUserId({id:userInput.id});
    
    if (existingParticipant) {
        throw new Error(`Participant with user id ${userInput.id} already exists.`);
    }

    const user = userDb.getUserById({id: userInput.id});

    if (!user) {
        throw new Error("User not found");
    }

    const participant = {
        user,
        dateOfBirth: new Date(dateOfBirth),
        events: [],
    };

    return participantDb.createParticipant(participant);

};

const getAllParticipants = () => {
    return participantDb.getAllParticipants();
};

export default{createParticipant, getAllParticipants};