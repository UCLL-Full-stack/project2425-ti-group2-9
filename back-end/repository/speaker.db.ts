import { Speaker } from '../model/speaker';
import { User } from '../model/user';

// Dummy User instances
const user1 = new User({
    username: "alice123",
    password: "password1",
    firstName: "Alice",
    lastName: "Smith",
    email: "alice@example.com",
    role: "speaker"
});

const user2 = new User({
    username: "bob456",
    password: "password2",
    firstName: "Bob",
    lastName: "Jones",
    email: "bob@example.com",
    role: "speaker"
});

const user3 = new User({
    username: "charlie789",
    password: "password3",
    firstName: "Charlie",
    lastName: "Brown",
    email: "charlie@example.com",
    role: "speaker"
});

// Initialize speakers array with dummy data
const speakers: Speaker[] = [
    new Speaker({ user: user1, expertise: "AI and Machine Learning" }),
    new Speaker({ user: user2, expertise: "Cybersecurity" }),
    new Speaker({ user: user3, expertise: "Cloud Computing" })
];

// Functions for managing speakers
const createSpeaker = ({
    user,
    expertise,
}: {
    user: User;
    expertise: string;
    events?: Event[];
}): Speaker => {
    const speaker = new Speaker({ user, expertise });
    speakers.push(speaker);
    return speaker;
};

const getAllSpeakers = (): Speaker[] => speakers;

const getSpeakerById = ({ id }: { id: number }): Speaker | undefined => {
    try {
        return speakers.find((speaker) => speaker.getId() === id);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getSpeakerByUserId = ({ id }: { id: number }): Speaker | undefined => {
    try {
        return speakers.find((speaker) => speaker.getUser().getId() === id);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createSpeaker,
    getAllSpeakers,
    getSpeakerById,
    getSpeakerByUserId,
};
