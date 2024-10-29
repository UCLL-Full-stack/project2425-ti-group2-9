import { Organizer } from "../model/organizer";
import { User } from "../model/user";

// Dummy User instances
const user1 = new User({username: "john123", password:'password',  firstName:'John',lastName:'Doe', email: "john@example.com", role: 'organizer' });
const user2 = new User({username: "jane123", password: "password", firstName:'Jane',lastName:'Doe', email: "jane@example.com", role: 'organizer'});
const user3 = new User({username: "senne123",password:"password" , firstName:'Senne',lastName:'Geerts', email: "senne@example.com", role: 'organizer'});

// Initialize organizers array with dummy data
const organizers: Organizer[] = [
    new Organizer({ user: user1, companyName: "John's Eventing" }),
    new Organizer({ user: user2, companyName: "Jane's Business" }),
    new Organizer({ user: user3, companyName: "Senne's Club" })
];

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