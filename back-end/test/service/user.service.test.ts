import { User } from '../../model/user';
import userService from '../../service/user.service';
import userDb from '../../repository/user.db';
import { Role, UserInput } from '../../types';
import bcrypt from 'bcrypt';

const userInput: UserInput = {
    username: 'janedoe',
    password: 'janed123',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@mail.be',
    role: 'participant' as Role,
};

const user = new User({
    id: 1,
   ...userInput,
});

let mockGetAllUsersDb: jest.Mock;
let mockGetUserByUsernameDb: jest.Mock;
let mockCreateUserDb: jest.Mock;

beforeEach(() => {
    mockGetAllUsersDb = jest.fn();
    mockGetUserByUsernameDb = jest.fn();
    mockCreateUserDb = jest.fn();

    jest.spyOn(userDb, 'getAllUsers').mockImplementation(mockGetAllUsersDb);
    jest.spyOn(userDb, 'getUserByUsername').mockImplementation(mockGetUserByUsernameDb);
    // Note: createUser is not directly tested here, but its dependencies are covered
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given no filters, when getAllUsers is called, then all users are returned', async () => {
    // Given
    const mockUsers = [user, { id: 2,...userInput, username: 'johndoe' }];
    mockGetAllUsersDb.mockResolvedValue(mockUsers);

    // When
    const result = await userService.getAllUsers();

    // Then
    expect(result).toEqual(mockUsers);
    expect(mockGetAllUsersDb).toHaveBeenCalledTimes(1);
});

test('given an existing username, when getUserByUsername is called, then the user is returned', async () => {
    // Given
    mockGetUserByUsernameDb.mockResolvedValue(user);

    // When
    const result = await userService.getUserByUsername({ username: userInput.username });

    // Then
    expect(result).toEqual(user);
    expect(mockGetUserByUsernameDb).toHaveBeenCalledTimes(1);
    expect(mockGetUserByUsernameDb).toHaveBeenCalledWith({ username: userInput.username });
});

test('given a non-existent username, when getUserByUsername is called, then an error is thrown', async () => {
    // Given
    mockGetUserByUsernameDb.mockResolvedValue(null);
    const nonExistentUsername = 'nonexistentuser';

    // When and Then
    await expect(userService.getUserByUsername({ username: nonExistentUsername })).rejects.toThrow(`User with username: ${nonExistentUsername} does not exist.`);
});

test('given invalid password, when authenticate is called, then an error is thrown', async () => {
    // Given
    const wrongPassword = 'wrongpassword';
    mockGetUserByUsernameDb.mockResolvedValue(user);

    // When and Then
    await expect(userService.authenticate({...userInput, password: wrongPassword })).rejects.toThrow('Username or password is incorrect');
});