import { Speaker } from "../model/speaker";
import speakerDb from "../repository/speaker.db";
//import userDb from "../repository/user.db";
import { SpeakerInput } from "../types";

// const createSpeaker = ({
//     user: userInput,
//     expertise,
// }: SpeakerInput): Speaker => {

//     // Validate that the user ID is present
//     if (!userInput?.id) {
//         throw new Error("User id is required");
//     }

//     // Check if a Speaker with the given user ID already exists
//     const existingSpeaker = speakerDb.getSpeakerByUserId({ id: userInput.id });

//     if (existingSpeaker) {
//         throw new Error(`Speaker with user id ${userInput.id} already exists.`);
//     }


//     const user = userDb.getUserById({ id: userInput.id });

//     if (!user) {
//         throw new Error("User not found");
//     }

    
//     const speaker = {
//         user,
//         expertise,
//         events: [], // Initialize with an empty events array if applicable
//     };

//     // Save the Speaker to the database
//     return speakerDb.createSpeaker(speaker);
// };

const getAllSpeakers = async(): Promise<Speaker[]> => {
    return await speakerDb.getAllSpeakers(); 
};

export default {
    //createSpeaker,
    getAllSpeakers,
};
