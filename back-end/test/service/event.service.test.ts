import { set } from 'date-fns';
import { Organizer } from '../../model/organizer';
import { Speaker } from '../../model/speaker';
import eventDb from '../../repository/event.db';
import organizerDb from '../../repository/organizer.db';
import speakerDb from '../../repository/speaker.db';
import eventService from '../../service/event.service';
import { EventInput, Role, UserInput } from '../../types';
import { User } from '../../model/user';
import participantDb from '../../repository/participant.db';



const userInput: UserInput = {
    id: 1,
    username: 'johndoe',
    password: 'johnd123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@mail.be',
    role: 'organizer',
};

// const userOrganizer = new User({
//     ...userInput,
// })

const userInput2: UserInput = {
    id: 2,
    username: 'johndoe',
    password: 'johnd123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe1@mail.be',
    role: 'speaker',
};

// const userSpeaker = new User({
//     ...userInput2,
// })

const organizerInput = {
    id: 1,
    user: userInput,
    companyName: 'Tech Corp',
};

// const organizer = new Organizer({
//     ...organizerInput,
// })

const speakerInput = {
    id: 1,
    user: userInput2,
    expertise: 'JavaScript',
    name: 'Speaker One',
};

// const speaker = new Speaker({
//     ...speakerInput,
// })

// const eventInput = {
//     id:1,
//     name: 'Test Event',
//     description: 'This is a test event',
//     category: 'Tech',
//     startDate: set(new Date(), { year: 2024, month: 1, date: 10 }),
//     endDate: set(new Date(), { year: 2024, month: 1, date: 12 }),
//     organizer: organizer,
//     speakers: [speaker],
// };

const eventInput = {
    id:1,
    name: 'Test Event',
    description: 'This is a test event',
    category: 'Tech',
    startDate: set(new Date(), { year: 2024, month: 1, date: 10 }),
    endDate: set(new Date(), { year: 2024, month: 1, date: 12 }),
    organizer: organizerInput,
    speakers: [speakerInput],
};

// const event = new Event({
//     ...eventInput,
// })

let createEventMock: jest.Mock;
let mockOrganizerDbGetOrganizerById: jest.Mock;
let mockSpeakerDbGetSpeakerById: jest.Mock;
let mockEventUpdate: jest.Mock;
let mockEventDelete: jest.Mock;
let mockEventDbGetEventById: jest.Mock;
let mockParticipantDbGetParticipantByUsername: jest.Mock;
let mockEventDbUpdateParticipantsOfEvent: jest.Mock;

beforeEach(() => {
    createEventMock = jest.fn();
    mockOrganizerDbGetOrganizerById = jest.fn();
    mockSpeakerDbGetSpeakerById = jest.fn();
    mockEventUpdate = jest.fn();
    mockEventDbGetEventById = jest.fn();
    mockParticipantDbGetParticipantByUsername = jest.fn();
    mockEventDbUpdateParticipantsOfEvent = jest.fn();
    mockEventDelete = jest.fn();

    // Properly mock the methods
    jest.spyOn(eventDb, 'createEvent').mockImplementation(createEventMock);
    jest.spyOn(organizerDb, 'getOrganizerById').mockImplementation(mockOrganizerDbGetOrganizerById);
    jest.spyOn(speakerDb, 'getSpeakerById').mockImplementation(mockSpeakerDbGetSpeakerById);
    jest.spyOn(eventDb, 'updateEventName').mockImplementation(mockEventUpdate);
    jest.spyOn(eventDb, 'getEventById').mockImplementation(mockEventDbGetEventById);
    jest.spyOn(participantDb, 'getParticipantByUsername').mockImplementation(mockParticipantDbGetParticipantByUsername);
    jest.spyOn(eventDb, 'updatePartcipantsofEvent').mockImplementation(mockEventDbUpdateParticipantsOfEvent);
    jest.spyOn(eventDb, 'deleteEvent').mockImplementation(mockEventDelete);
});

afterEach(() => {
    jest.clearAllMocks();
});

// Happy Test Case
test('given a valid event input, when event is created, then event is created with those values', async () => {
    // Given
    mockOrganizerDbGetOrganizerById.mockReturnValue(organizerInput);  
    mockSpeakerDbGetSpeakerById.mockReturnValue(speakerInput);  

    const eventInput = {
        name: 'Test Event',
        description: 'This is a test event',
        category: 'Tech',
        startDate: set(new Date(), { year: 2024, month: 1, date: 10 }),
        endDate: set(new Date(), { year: 2024, month: 1, date: 12 }),
        organizer: organizerInput,
        speakers: [speakerInput],
    };

    // When
    await eventService.createEvent(eventInput, { username: 'admin', role: 'admin' });

    // Then
    expect(createEventMock).toHaveBeenCalledTimes(1);
    expect(createEventMock).toHaveBeenCalledWith(eventInput);
});

test('given a valid event input but role is participant, when event is created, then event is created with those values', async () => {
    // Given
    mockOrganizerDbGetOrganizerById.mockReturnValue(organizerInput); 
    mockSpeakerDbGetSpeakerById.mockReturnValue(speakerInput);  

    // When
    const createEvent = () => eventService.createEvent(eventInput, { username: 'participant', role: 'participant' });

    expect(createEvent).rejects.toThrow(`You are not authorized to access this resource.`);
});

test('given a non-existent organizer id, when event is created, then an error is thrown', async () => {
    // Given
    mockOrganizerDbGetOrganizerById.mockReturnValue(null);
    // When
    const createEvent = () => eventService.createEvent(eventInput, { username: 'admin', role: 'admin' });

    // Then
    expect(createEvent).rejects.toThrow(`Organizer not found`);
});

test('given a valid event input, when updateEvent is called, event is updated', async () => {
    // Arrange
    mockEventDbGetEventById.mockReturnValueOnce(eventInput); // Ensure event exists
    mockEventUpdate.mockResolvedValueOnce({ ...eventInput, name: 'Updated Event' }); // Simulate successful update

    const updateEventInput = {
        id: eventInput.id,
        name: 'Updated Event',
        username: 'admin',
        role: 'admin' as Role,
    };

    // Act
    const updatedEvent = await eventService.updateEvent(updateEventInput);

    // Assert
    expect(mockEventUpdate).toHaveBeenCalledTimes(1);
    expect(mockEventUpdate).toHaveBeenCalledWith({ id: updateEventInput.id, name: updateEventInput.name });
    //expect(updatedEvent.name).toBe('Updated Event');
});


test('given a non-existent event id, when updateEvent is called, then an error is thrown', async () => {
    // Given
    mockEventDbGetEventById.mockReturnValue(null);  // Mock non-existent event

    const updateEventInput = {
        id: 99, 
        name: 'Updated Event',
        username: 'admin',
        role: 'admin' as Role,
    };

    // When
    const updateEvent = () => eventService.updateEvent(updateEventInput);

    // Then
    expect(updateEvent).rejects.toThrow("Updating event failed");
});

test('given an invalid role, when updateEvent is called, then UnauthorizedError is thrown', async () => {
    // Given
    mockEventDbGetEventById.mockReturnValue(eventInput);  // Mock the event
    const updateEventInput = {
        id: eventInput.id,
        name: 'Updated Event',
        username: 'participant',  
        role: 'participant' as Role,
    };

    // When
    const updateEvent = () => eventService.updateEvent(updateEventInput);

    // Then
    expect(updateEvent).rejects.toThrow(
        'You are not authorized to access this resource.')
    ;
});

test('given a valid organizer role, when deleteEvent is called, then the event is deleted', async () => {
    // Given
    const eventId = 1;
    const role: Role = 'organizer';
    const username = 'test_organizer';
    
    // When
    await eventService.deleteEvent({ id: eventId, username, role });

    // Then
    expect(eventDb.deleteEvent).toHaveBeenCalledTimes(1);
    expect(eventDb.deleteEvent).toHaveBeenCalledWith({ id: eventId });
});

test('given an invalid participant role, when deleteEvent is called, then the event is deleted', async () => {
    // Given
    const eventId = 1;
    const role: Role = 'participant';
    const username = 'test_organizer';
    
    // When
    const deleted = () => eventService.deleteEvent({ id: eventId, username, role });

    // Then
    expect(deleted).rejects.toThrow(
        'You are not authorized to access this resource.')
    ;
});
