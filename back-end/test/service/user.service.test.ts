import { User } from '../../model/user';
import userService from '../../service/user.service';
import userDb from '../../repository/user.db';
import { UserInput } from '../../types';

const userInput: UserInput = {
    username: 'janedoe',
    password: 'janed123',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@mail.be',
    role: 'participant',
};

const user = new User({
    id: 1,
    ...userInput,
});

let createUserMock: jest.Mock;
let mockUserDbGetUserByEmail: jest.Mock;
let mockUserDbGetUserById: jest.Mock;

beforeEach(() => {
    createUserMock = jest.fn();
    mockUserDbGetUserByEmail = jest.fn();
    mockUserDbGetUserById = jest.fn();

    jest.spyOn(userDb, 'createUser').mockImplementation(createUserMock);
    jest.spyOn(userDb, 'getUserByEmail').mockImplementation(mockUserDbGetUserByEmail);
    jest.spyOn(userDb, 'getUserById').mockImplementation(mockUserDbGetUserById);
});

afterEach(() => {
    jest.clearAllMocks();
});

// Happy Test Case for User Creation
test('given a valid user, when user is created, then user is created with those values', () => {
    // Given
    mockUserDbGetUserByEmail.mockReturnValue(null); // No existing user

    // When
    userService.createUser(userInput);

    // Then
    expect(createUserMock).toHaveBeenCalledTimes(1);
    expect(createUserMock).toHaveBeenCalledWith(userInput);
});

//unhappy Test Case for User Creation (Duplicate Email)
test('given an existing email, when user is created, then an error is thrown', () => {
    // Given
    mockUserDbGetUserByEmail.mockReturnValue(user); // Simulate existing user

    // When
    const createdUser = () => userService.createUser(userInput)
    // Then
    expect(createdUser).toThrow(`User with email ${userInput.email} already exists.`);
});

// Happy Test Case for Get User by ID
test('given a valid user ID, when getting user, then user is returned', () => {
    // Given
    mockUserDbGetUserById.mockReturnValue(user); // Simulate existing user

    // When
    const retrievedUser = userService.getUserById(1);

    // Then
    expect(mockUserDbGetUserById).toHaveBeenCalledWith({ id: 1 });
    expect(retrievedUser).toEqual(user);
});

// Happy Test Case for Get User by Email
test('given a valid email, when getting user, then user is returned', () => {
    // Given
    mockUserDbGetUserByEmail.mockReturnValue(user); // Simulate existing user

    // When
    const retrievedUser = userService.getUserByEmail(userInput.email);

    // Then
    expect(mockUserDbGetUserByEmail).toHaveBeenCalledWith(userInput.email);
    expect(retrievedUser).toEqual(user);
});

// Error Test Case for Get User by Email (Not Found)
test('given a non-existent email, when getting user, then an error is thrown', () => {
    // Given
    mockUserDbGetUserByEmail.mockReturnValue(null); // Simulate non-existent user

    // When
    const email = 'test@example.be'
    const user = () => userService.getUserByEmail(email);
    // Then
    expect(user).toThrow(`User with email ${email} not found.`)
});