import { User } from "../../model/user";

const username = 'senne123';
const firstName = 'Senne';
const lastName = 'Geerts';
const email = 'geerts@gmail.com';
const password = 'password123';
const role = 'participant';

test('given: valid values for user, when: user is created, then user will be created with those values', () => {
    //given create new user
    const user = new User({
        username,
        firstName,
        lastName,
        email,
        password,
        role,
    });
    //then: assert that the user has the given values
    expect(user.getUsername()).toEqual(username);
    expect(user.getFirstName()).toEqual(firstName);
    expect(user.getLastName()).toEqual(lastName);
    expect(user.getEmail()).toEqual(email);
    expect(user.getPassword()).toEqual(password);
    expect(user.getRole()).toEqual(role);
})