import { Organizer } from "../model/organizer";
import database from "./database";
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

const getOrganizerByUsername = async({username}: {username: string}): Promise<Organizer | null> => {
    try {
        const organizerPrisma = await database.organizer.findFirst({
            where: {user: {username}},
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

export default {
    getAllOrganizers,
    getOrganizerById,
    getOrganizerByUsername
};