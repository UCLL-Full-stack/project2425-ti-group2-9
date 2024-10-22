import { set } from 'date-fns';
import { Participant } from '../../model/participant';
import { User } from '../../model/user';
import participantDb from '../../repository/participant.db';
import userDb from '../../repository/user.db';
import participantService from '../../service/participant.service';
import { UserInput, ParticipantInput } from '../../types';

const userInput: UserInput = {
    id: 1,
    username: 'johndoe',
    password: 'johnd123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@mail.be',
    role: 'participant',
};

const user = new User({
    ...userInput,
});

const dateOfBirth = set(new Date(), { year: 2003, month: 1, date: 12 });



const participantInput: ParticipantInput = {
    id:1,
    user: userInput,
    dateOfBirth: dateOfBirth,
};

let createParticipantMock: jest.Mock;
let mockUserDbGetUserById: jest.Mock;
let mockParticipantDbGetParticipantByUserId: jest.Mock;

beforeEach(() => {
    createParticipantMock = jest.fn();
    mockUserDbGetUserById = jest.fn();
    mockParticipantDbGetParticipantByUserId = jest.fn();

    jest.spyOn(participantDb, 'createParticipant').mockImplementation(createParticipantMock);
    jest.spyOn(userDb, 'getUserById').mockImplementation(mockUserDbGetUserById);
    jest.spyOn(participantDb, 'getParticipantByUserId').mockImplementation(mockParticipantDbGetParticipantByUserId);
});

afterEach(() => {
    jest.clearAllMocks();
});

// Happy Test Case
test('given a valid participant, when participant is created, then participant is created with those values', async () => {
    // Given
    mockUserDbGetUserById.mockReturnValue(user);

    const participantInput = {
        user: userInput,
        dateOfBirth: dateOfBirth,
        events: []
    };

    // When
    participantService.createParticipant(participantInput);

    // Then
    expect(createParticipantMock).toHaveBeenCalledTimes(1);
    expect(createParticipantMock).toHaveBeenCalledWith(participantInput);
});

//Unhappy Test Case
test('given a participant with an existing user id, when participant is created, then an error is thrown', async () => {
    // given
    const existingParticipant = new Participant({
        user,
        dateOfBirth: dateOfBirth,
        events: [],
    });

    mockParticipantDbGetParticipantByUserId.mockReturnValue(existingParticipant); // Mock the existence of the participant

    const participantInput = {
        user: userInput,
        dateOfBirth: dateOfBirth,
    };

    // when
    const createParticipant = () => participantService.createParticipant(participantInput);

    // then
    expect(createParticipant).toThrow(`Participant with user id ${userInput.id} already exists.`);
});
