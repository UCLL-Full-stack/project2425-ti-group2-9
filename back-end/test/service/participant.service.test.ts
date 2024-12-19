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

const participantUser = new User ({
    ...userInput
})

const participantInput = {
    user: participantUser,
    dateOfBirth: set(new Date(), { year: 2003, month: 1, date: 12 }),
}

const participant = new Participant({
    ...participantInput
})

const mockGetAllParticipantsDb = jest.fn();
const mockGetParticipantByUserNameDb = jest.fn();

jest.spyOn(participantDb, 'getAllParticipants').mockImplementation(mockGetAllParticipantsDb);
jest.spyOn(participantDb, 'getParticipantByUsername').mockImplementation(mockGetParticipantByUserNameDb);

test('given participants, when getAllparticipants is called, then all participants are returned', async () => {
    // Given
    mockGetAllParticipantsDb.mockReturnValue(participant);

    // When
    const result = await participantService.getAllParticipants();

    // Then
    expect(result).toEqual(participant);
    expect(mockGetAllParticipantsDb).toHaveBeenCalledTimes(1);
});

test('given a valid username, when getParticipantByUserName is called, then the participant is returned', async () => {
    // Given
    mockGetParticipantByUserNameDb.mockReturnValue(participant);
    const validUsername = participant.getUser().getUsername();

    // When
    const participantResult = await participantService.getParticipantByUserName({username: validUsername});

    // Then
    expect(participantResult).toEqual(participant);
    expect(mockGetParticipantByUserNameDb).toHaveBeenCalledTimes(1);
    expect(mockGetParticipantByUserNameDb).toHaveBeenCalledWith({ username: participant.getUser().getUsername() });
});


test('given an invalid username, when getParticipantByUserName is called, then an error is thrown', async () => {
    // Given
    mockGetParticipantByUserNameDb.mockReturnValue(null);
    const invalidUsername = ''; // Consider a more clearly invalid input if testing formats

    // When and Then
    await expect(participantService.getParticipantByUserName({username: invalidUsername})).rejects.toThrow(`Participant not found`);
});
