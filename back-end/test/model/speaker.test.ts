import { Speaker } from "../../model/speaker";
import { User } from "../../model/user";

const user = new User({
    username: "john.doe",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "password123",
    role: "speaker"
});
const expertise = 'java';

test('given: valid values for speaker when: speaker created, then speaker has those values', () => {
    //when: speaker created
    const speaker = new Speaker({
        user,
        expertise
    });

    //then: speaker has those values
    expect(speaker.getUser()).toEqual(user);
    expect(speaker.getExpertise()).toEqual(expertise);
});

test('given: empty expertise for speaker when: creating speaker, then error is thrown', () => {
    //given
    const emptyExpertise = '';
    //when
    const speaker = () => new Speaker({user, expertise: emptyExpertise});
    //then
    expect(speaker).toThrow('Expertise is required');
});