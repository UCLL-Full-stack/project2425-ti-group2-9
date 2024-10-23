import { set } from 'date-fns';
import { Organizer } from '../../model/organizer';
import { Speaker } from '../../model/speaker';
import eventDb from '../../repository/event.db';
import organizerDb from '../../repository/organizer.db';
import speakerDb from '../../repository/speaker.db';
import eventService from '../../service/event.service';
import { EventInput, UserInput } from '../../types';
import { User } from '../../model/user';

const userInput: UserInput = {
    id: 1,
    username: 'johndoe',
    password: 'johnd123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@mail.be',
    role: 'organizer',
};

const userInput2: UserInput = {
    id: 2,
    username: 'johndoe',
    password: 'johnd123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe1@mail.be',
    role: 'speaker',
};

const organizerInput = {
    id: 1,
    user: userInput,
    companyName: 'Tech Corp',
};

const speakerInput = {
    id: 1,
    user: userInput2,
    expertise: 'JavaScript',
    name: 'Speaker One',
};

let createEventMock: jest.Mock;
let mockOrganizerDbGetOrganizerById: jest.Mock;
let mockSpeakerDbGetSpeakerById: jest.Mock;

beforeEach(() => {
    createEventMock = jest.fn();
    mockOrganizerDbGetOrganizerById = jest.fn();
    mockSpeakerDbGetSpeakerById = jest.fn();

    jest.spyOn(eventDb, 'createEvent').mockImplementation(createEventMock);
    jest.spyOn(organizerDb, 'getOrganizerById').mockImplementation(mockOrganizerDbGetOrganizerById);
    jest.spyOn(speakerDb, 'getSpeakerById').mockImplementation(mockSpeakerDbGetSpeakerById);
});

afterEach(() => {
    jest.clearAllMocks();
});

// Happy Test Case
test('given a valid event input, when event is created, then event is created with those values', async () => {
    // Given
    mockOrganizerDbGetOrganizerById.mockReturnValue(organizerInput);  // Mock the organizer
    mockSpeakerDbGetSpeakerById.mockReturnValue(speakerInput);  // Mock the speaker

    const eventInput = {
        name: 'Test Event',
        description: 'This is a test event',
        category: 'Tech',
        startDate: set(new Date(), { year: 2024, month: 1, date: 10 }),
        endDate: set(new Date(), { year: 2024, month: 1, date: 12 }),
        organizer: organizerInput,
        speakers: [speakerInput],
        participants: [],
    };

    // When
    eventService.createEvent(eventInput);

    // Then
    expect(createEventMock).toHaveBeenCalledTimes(1);
    expect(createEventMock).toHaveBeenCalledWith(eventInput);
});

// Unhappy Test Case: Organizer Not Found
test('given a non-existent organizer id, when event is created, then an error is thrown', async () => {
    // Given
    mockOrganizerDbGetOrganizerById.mockReturnValue(null);

    const eventInput = {
        name: 'Test Event',
        description: 'This is a test event',
        category: 'Tech',
        startDate: set(new Date(), { year: 2024, month: 1, date: 10 }),
        endDate: set(new Date(), { year: 2024, month: 1, date: 12 }),
        organizer: organizerInput,
        speakers: [speakerInput],
        participants: [],
    };

    // When
    const createEvent = () => eventService.createEvent(eventInput);

    // Then
    expect(createEvent).toThrow('Organizer not found');
});
