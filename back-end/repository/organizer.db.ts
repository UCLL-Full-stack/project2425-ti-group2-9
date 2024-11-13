import { Organizer } from "../model/organizer";
import database from "./database";

// const createOrganizer = ({
//     user,
//     companyName,
    
// }: {
//     user: User;
//     companyName: string;
// }): Organizer => {
//     const organizer = new Organizer({
//         user,
//         companyName,
//     });
    
//     organizers.push(organizer);
//     return organizer;
// };

const getAllOrganizers = async (): Promise<Organizer[]> => {
    try {
        const organizerPrisma = await database.organizer.findMany({
            include: {
                user: true
            }
        });
        return organizerPrisma.map((organizerPrisma)=>Organizer.from(organizerPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getOrganizerById = async ({id}:{id: number}): Promise<Organizer | null> => {
    try {
        const organizerPrisma = await database.organizer.findUnique({
            where: {id},
            include: {user: true}
        });
        if(organizerPrisma){
            return Organizer.from(organizerPrisma);
        }else{
            return null;
        }
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
    
};

// const getOrganizerByUserId = ({id}:{id: number}): Organizer | undefined => {
//     try {
//         return organizers.find(organizer => organizer.getUser().getId() === id);
//     } catch (error) {
//         throw new Error('Database error. See server log for details.');
//     }
// };

export default {
    //createOrganizer,
    getAllOrganizers,
    getOrganizerById,
    //getOrganizerByUserId
};