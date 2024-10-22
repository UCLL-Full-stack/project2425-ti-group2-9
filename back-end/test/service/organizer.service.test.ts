import { Organizer } from '../../model/organizer';
import { User } from '../../model/user';
import organizerDb from '../../repository/organizer.db';
import userDb from '../../repository/user.db';
import organizerService from '../../service/organizer.service';
import { UserInput, OrganizerInput } from '../../types';

const userInput: UserInput = {
    id: 1,
    username: 'johndoe',
    password: 'johnd123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@mail.be',
    role: 'organizer',
};

const user = new User({
    ...userInput,
});

const organizerInput: OrganizerInput = {
    id: 1,
    user: userInput,
    companyName: 'Tech Corp',
};

let createOrganizerMock: jest.Mock;
let mockUserDbGetUserById: jest.Mock;
let mockOrganizerDbGetOrganizerByUserId: jest.Mock;

beforeEach(() => {
    createOrganizerMock = jest.fn();
    mockUserDbGetUserById = jest.fn();
    mockOrganizerDbGetOrganizerByUserId = jest.fn();

    jest.spyOn(organizerDb, 'createOrganizer').mockImplementation(createOrganizerMock);
    jest.spyOn(userDb, 'getUserById').mockImplementation(mockUserDbGetUserById);
    jest.spyOn(organizerDb, 'getOrganizerByUserId').mockImplementation(mockOrganizerDbGetOrganizerByUserId);
});

afterEach(() => {
    jest.clearAllMocks();
});

// Happy Test Case
test('given a valid organizer, when organizer is created, then organizer is created with those values', async () => {
    // Given
    mockUserDbGetUserById.mockReturnValue(user);

    const organizerInput = {
        user: userInput,
        companyName: 'Tech Corp',
    };

    // When
    organizerService.createOrganizer(organizerInput);

    // Then
    expect(createOrganizerMock).toHaveBeenCalledTimes(1);
    expect(createOrganizerMock).toHaveBeenCalledWith(organizerInput);
});

// Unhappy Test Case
test('given an organizer with an existing user id, when organizer is created, then an error is thrown', async () => {
    // Given
    const existingOrganizer = new Organizer({
        user,
        companyName: 'Tech Corp',
    });

    mockOrganizerDbGetOrganizerByUserId.mockReturnValue(existingOrganizer); // Mock the existence of the organizer

    const organizerInput = {
        user: userInput,
        companyName: 'Tech Corp',
    };

    // When
    const createOrganizer = () => organizerService.createOrganizer(organizerInput);

    // Then
    expect(createOrganizer).toThrow(`Organizer with user id ${userInput.id} already exists.`);
});
