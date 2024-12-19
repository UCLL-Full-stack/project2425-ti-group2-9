import { Speaker } from "../../model/speaker";
import speakerDb from "../../repository/speaker.db";
import userDb from "../../repository/user.db";
import speakerService from "../../service/speaker.service";
import { User } from "../../model/user";
import { Role, SpeakerInput, UserInput } from "../../types";

const userInput: UserInput = {
    id: 1,
    username: 'johndoe',
    password: 'johnd123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@mail.be',
    role: 'speaker',
};

const userSpeaker = new User({
    ...userInput,
});

const speakerInput = {
    user: userSpeaker,
    expertise: 'dev',
}

const speaker = new Speaker({
    ...speakerInput
})
    
const mockGetAllSpeakers = jest.fn();

jest.spyOn(speakerDb, 'getAllSpeakers').mockImplementation(mockGetAllSpeakers);



afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
});

test('given an admin user, when getAllOrganizers is called, then all organizers are returned', async () => {
    // Given
    const request = { username: 'adminUser', role: 'admin' as Role};
    //const mockOrganizers = [{ id: 1, name: 'Test Organizer' }, { id: 2, name: 'Another Organizer' }];
    mockGetAllSpeakers.mockReturnValue(speaker);

    // When
    const result = await speakerService.getAllSpeakers(request);

    // Then
    expect(result).toEqual(speaker);
    expect(mockGetAllSpeakers).toHaveBeenCalledTimes(1);
});

