import { Speaker } from '../model/speaker';
import { User } from '../model/user';
import database from './database';

// // Dummy User instances
// const user1 = new User({
//     username: "alice123",
//     password: "password1",
//     firstName: "Alice",
//     lastName: "Smith",
//     email: "alice@example.com",
//     //role: "speaker"
// });

// const user2 = new User({
//     username: "bob456",
//     password: "password2",
//     firstName: "Bob",
//     lastName: "Jones",
//     email: "bob@example.com",
//     //role: "speaker"
// });

// const user3 = new User({
//     username: "charlie789",
//     password: "password3",
//     firstName: "Charlie",
//     lastName: "Brown",
//     email: "charlie@example.com",
//     //role: "speaker"
// });

// // Initialize speakers array with dummy data
// const speakers: Speaker[] = [
//     new Speaker({ id:1, user: user1, expertise: "AI and Machine Learning" }),
//     new Speaker({ id:2, user: user2, expertise: "Cybersecurity" }),
//     new Speaker({ id:3, user: user3, expertise: "Cloud Computing" })
// ];

// Functions for managing speakers
// const createSpeaker = ({
//     user,
//     expertise,
// }: {
//     user: User;
//     expertise: string;
//     events?: Event[];
// }): Speaker => {
//     const speaker = new Speaker({ user, expertise });
//     speakers.push(speaker);
//     return speaker;
// };

const getAllSpeakers = async (): Promise<Speaker[]> => {
    try {
       const speakerPrisma = await database.speaker.findMany({
            include: {
                user: true
            }
       })
       return speakerPrisma.map((speakerPrisma)=>Speaker.from(speakerPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getSpeakerById = async ({ id }: { id: number }): Promise<Speaker | null> => {
    try {
        const speakerPrisma = await database.speaker.findUnique({
            where: {id},
            include: {
                user: true
            }
        });
        if(speakerPrisma){
            return Speaker.from(speakerPrisma);
        } else{
            return null;
        }
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// const getSpeakerByUserId = ({ id }: { id: number }): Speaker | undefined => {
//     try {
//         return speakers.find((speaker) => speaker.getUser().getId() === id);
//     } catch (error) {
//         console.error(error);
//         throw new Error('Database error. See server log for details.');
//     }
// };

export default {
    //createSpeaker,
    getAllSpeakers,
    getSpeakerById,
    //getSpeakerByUserId,
};
