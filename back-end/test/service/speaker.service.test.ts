import { Speaker } from "../../model/speaker";
import speakerDb from "../../repository/speaker.db";
import userDb from "../../repository/user.db";
import speakerService from "../../service/speaker.service";
import { User } from "../../model/user";
import { UserInput } from "../../types";

const userInput: UserInput = {
    id: 1,
    username: 'johndoe',
    password: 'johnd123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@mail.be',
    role: 'speaker',
};

const user = new User({
    ...userInput,
});

// Initialize expertise and mock events array
const expertise = "Cybersecurity";

// Mock functions
let mockCreateSpeakerDb: jest.Mock;
let mockGetUserByIdDb: jest.Mock;
let mockGetSpeakerByUserIdDb: jest.Mock;

beforeEach(() => {
    // Setup mock functions before each test
    mockCreateSpeakerDb = jest.fn();
    mockGetUserByIdDb = jest.fn();
    mockGetSpeakerByUserIdDb = jest.fn();

    // Replace actual implementations with mocks
    jest.spyOn(speakerDb, 'createSpeaker').mockImplementation(mockCreateSpeakerDb);
    jest.spyOn(userDb, 'getUserById').mockImplementation(mockGetUserByIdDb);
    jest.spyOn(speakerDb, 'getSpeakerByUserId').mockImplementation(mockGetSpeakerByUserIdDb);
});

afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
});

// Happy path test case
test('given valid input when createSpeaker is called, then speaker is created successfully', () => {
    // given
    mockGetUserByIdDb.mockReturnValue(user);

    const speakerInput = {
        user: userInput,
        expertise,
        events: []
    };

    // when
    speakerService.createSpeaker(speakerInput);

    // then
    expect(mockCreateSpeakerDb).toHaveBeenCalledTimes(1);
    expect(mockCreateSpeakerDb).toHaveBeenCalledWith(speakerInput);
});

// Error test case: Speaker with user id already exists
test('given an existing speaker when createSpeaker is called, then an error is thrown', () => {
    // given
    const existingSpeaker = new Speaker({ user, expertise, events: [] });
    mockGetSpeakerByUserIdDb.mockReturnValue(existingSpeaker); // Mock the existence of the speaker

    const speakerInput = {
        user: userInput,
        expertise,
    };

    // when
    const createdSpeaker = () => speakerService.createSpeaker(speakerInput);
    expect(createdSpeaker).toThrow(`Speaker with user id ${userInput.id} already exists.`);
});