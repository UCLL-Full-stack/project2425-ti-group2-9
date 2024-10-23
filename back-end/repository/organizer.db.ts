import { Organizer } from "../model/organizer";
import { User } from "../model/user";

const organizers : Organizer[] = [];

const createOrganizer = ({
    user,
    companyName,
    
}: {
    user: User;
    companyName: string;
}): Organizer => {
    const organizer = new Organizer({
        user,
        companyName,
    });
    
    organizers.push(organizer);
    return organizer;
};

const getAllOrganizers = (): Organizer[] => {
    return organizers;
};

const getOrganizerById = ({id}:{id: number}): Organizer | undefined => {
    return organizers.find((organizer) => organizer.getId() === id);
};

const getOrganizerByUserId = ({id}:{id: number}): Organizer | undefined => {
    try {
        return organizers.find(organizer => organizer.getUser().getId() === id);
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createOrganizer,
    getAllOrganizers,
    getOrganizerById,
    getOrganizerByUserId
};