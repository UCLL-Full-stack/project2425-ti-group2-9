import { Speaker } from '../model/speaker';
import { User } from '../model/user';

const speakers : Speaker[] = [];

const createSpeaker = ({
    user,
    expertise,
}:{
    user: User,
    expertise: string,
    events?: Event[]
}): Speaker => {
    const speaker = new Speaker({
        user,
        expertise,
    });
    speakers.push(speaker);
    return speaker;
};

const getAllSpeakers = (): Speaker[]=> speakers;

const getSpeakerById = ({id}: {id: number}): Speaker | undefined => {
    try {
        return speakers.find((speaker) => speaker.getId() === id);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getSpeakerByUserId = ({id}: {id: number}): Speaker | undefined => {
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