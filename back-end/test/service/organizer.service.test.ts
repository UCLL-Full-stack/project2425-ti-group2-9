import { Organizer } from '../../model/organizer';
import { User } from '../../model/user';
import organizerDb from '../../repository/organizer.db';
import organizerService from '../../service/organizer.service';
import { Role, UserInput } from '../../types';
import { UnauthorizedError } from 'express-jwt';

const userInput: UserInput = {
    id: 1,
    username: 'johndoe',
    password: 'johnd123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@mail.be',
    role: 'organizer',
};

const userOrganizer = new User({
    ...userInput,
})

const organizerInput = {
    id: 1,
    user: userOrganizer,
    companyName: 'Tech Corp',
};

const organizer = new Organizer({
    ...organizerInput,
})

const mockGetAllOrganizersDb = jest.fn();
const mockGetOrganizerByIdDb = jest.fn();

jest.spyOn(organizerDb, 'getAllOrganizers').mockImplementation(mockGetAllOrganizersDb);
jest.spyOn(organizerDb, 'getOrganizerById').mockImplementation(mockGetOrganizerByIdDb);

afterEach(() => {
    jest.clearAllMocks();
});

// **Tests for getAllOrganizers**

// Happy Test Case: Authorized User (Admin)
test('given an admin user, when getAllOrganizers is called, then all organizers are returned', async () => {
    // Given
    const adminUser = { username: 'adminUser', role: 'admin' as Role};
    //const mockOrganizers = [{ id: 1, name: 'Test Organizer' }, { id: 2, name: 'Another Organizer' }];
    mockGetAllOrganizersDb.mockReturnValue(organizer);

    // When
    const result = await organizerService.getAllOrganizers(adminUser);

    // Then
    expect(result).toEqual(organizer);
    expect(mockGetAllOrganizersDb).toHaveBeenCalledTimes(1);
});

// Unhappy Test Case: Unauthorized User
test('given a non-admin/organizer user, when getAllOrganizers is called, then UnauthorizedError is thrown', async () => {
    // Given
    const nonAuthorizedUser = { username: 'basicUser', role: 'participant' as Role };

    // When
    const getAllOrganizersCall = async () => await organizerService.getAllOrganizers(nonAuthorizedUser);

    // Then
    await expect(getAllOrganizersCall()).rejects.toThrow(UnauthorizedError);
    expect(mockGetAllOrganizersDb).not.toHaveBeenCalled();
});

// **Tests for getOrganizerById**

// Happy Test Case: Authorized User (Organizer) with Existing Organizer
test('given an organizer user and an existing organizer id, when getOrganizerById is called, then the organizer is returned', async () => {
    // Given
    const request = {id:1, username: 'adminUser', role: 'admin' as Role};
    //const existingOrganizer = { id: 1, name: 'Existing Organizer' };
    mockGetOrganizerByIdDb.mockReturnValue(organizer);

    // When
    const result = await organizerService.getOrganizerById( request);

    // Then
    expect(result).toEqual(organizer);
    expect(mockGetOrganizerByIdDb).toHaveBeenCalledTimes(1);
    expect(mockGetOrganizerByIdDb).toHaveBeenCalledWith({ id: request.id });
});

// Unhappy Test Case: Non-Existent Organizer
test('given an authorized user but non-existent organizer id, when getOrganizerById is called, then Error is thrown', async () => {
    // Given
    const badRequest = { id: 99, username: 'adminUser', role: 'admin' as Role};
    mockGetOrganizerByIdDb.mockReturnValue(null);
    // When
    const getOrganizerByIdCall = async () => await organizerService.getOrganizerById(badRequest);
    // Then
    await expect(getOrganizerByIdCall()).rejects.toThrow(Error);
    expect(mockGetOrganizerByIdDb).toHaveBeenCalledTimes(1);
    expect(mockGetOrganizerByIdDb).toHaveBeenCalledWith({ id: badRequest.id });
});
// Unhappy Test Case: Unauthorized User
test('given a non-admin/organizer user, when getOrganizerById is called, then UnauthorizedError is thrown', async () => {
    // Given
    const request = { id: 1, username: 'basicUser', role: 'participant' as Role};
    // When
    const getOrganizerByIdCall = async () => await organizerService.getOrganizerById(request);
    // Then
    await expect(getOrganizerByIdCall()).rejects.toThrow(UnauthorizedError);
    expect(mockGetOrganizerByIdDb).not.toHaveBeenCalled();
});