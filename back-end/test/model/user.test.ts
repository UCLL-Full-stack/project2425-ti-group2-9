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
});

test('given: empty username for user, when: user is created, then an error is thrown',() =>{
    //given
    const emptyUsername = '';
    //when
    const user = () => new User({
        username: emptyUsername,
        firstName,
        lastName,
        email,
        password,
        role,
    });
    expect(user).toThrow('Username is required');
});

test('given: empty firstName for user, when: user is created, then an error is thrown',() =>{
    //given
    const emptyFirstname = '';
    //when
    const user = () => new User({
        username,
        firstName: emptyFirstname,
        lastName,
        email,
        password,
        role,
    });
    expect(user).toThrow('First name is required');
});

test('given: empty lastName for user, when: user is created, then an error is thrown',() =>{
    //given
    const emptyLastname = '';
    //when
    const user = () => new User({
        username,
        firstName,
        lastName: emptyLastname,
        email,
        password,
        role,
    });
    expect(user).toThrow('Last name is required');
});

test('given: empty email for user, when: user is created, then an error is thrown',() =>{
    //given
    const emptyEmail = '';
    //when
    const user = () => new User({
        username,
        firstName,
        lastName,
        email: emptyEmail,
        password,
        role,
    });
    expect(user).toThrow('Email is required');
});

test('given: empty password for user, when: user is created, then an error is thrown',() =>{
    //given
    const emptyPassword = '';
    //when
    const user = () => new User({
        username,
        firstName,
        lastName,
        email,
        password: emptyPassword,
        role,
    });
    expect(user).toThrow('Password is required');
});

test('given: invalid email for user, when: user is created, then an error is thrown', () => {
    //given 
    const invalidEmail = 'senne@test';
    //when
    const user = () => new User({
        username,
        firstName,
        lastName,
        email:invalidEmail,
        password,
        role,
    });
    expect(user).toThrow('Email is not correct');
});