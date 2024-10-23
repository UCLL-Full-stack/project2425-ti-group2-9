import { Organizer } from '../model/organizer';
import organizerDb from '../repository/organizer.db';
import userDb from '../repository/user.db';
import { OrganizerInput } from '../types';

const createOrganizer = ({
    user: userInput,
    companyName,
}: OrganizerInput): Organizer => {
    
    if (!userInput?.id) {
        throw new Error("User id is required");
    }

    const existingOrganizer = organizerDb.getOrganizerByUserId({ id: userInput.id });
    
    if (existingOrganizer) {
        throw new Error(`Organizer with user id ${userInput.id} already exists.`);
    }

    const user = userDb.getUserById({ id: userInput.id });
    
    if (!user) {
        throw new Error("User not found");
    }

    const organizer = {
        user,
        companyName,
    };

    return organizerDb.createOrganizer(organizer);
};

const getAllOrganizers = () => {
    return organizerDb.getAllOrganizers();
};

const getOrganizerById = (id: number): Organizer => {
    const organizer = organizerDb.getOrganizerById({id});
    if (!organizer) {
        throw new Error(`Organizer with id ${id} not found.`);
    }
    return organizer;
};

export default {
    createOrganizer,
    getAllOrganizers,
    getOrganizerById,
};
