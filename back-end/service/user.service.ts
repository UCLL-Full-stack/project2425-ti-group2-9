import bcrypt from 'bcrypt';
import userDB from '../repository/user.db';
import { AuthenticationResponse, Role, UserInput } from '../types';
import { generateJwtToken } from '../util/jwt';
import { User } from '../model/user';
import { UnauthorizedError } from "express-jwt";

import xss from 'xss';
import { get } from 'http';

const getAllUsers = async (): Promise<User[]> => userDB.getAllUsers();

const getAllUsersNotAdmin = async ({username, role}:{username:string, role: Role}): Promise<User[]> => {
    if(role !== 'admin'){
        throw new Error('You are not authorized to access this resource.');
    }
    return userDB.getAllUsersNotAdmin()
};

const deleteUser = async ({id, username, role}:{id: number, username: string, role: Role}): Promise<User | null> => {
    if(role === 'admin'){
        return await userDB.deleteUser({ id });
    }
    throw new UnauthorizedError('credentials_required', {
        message: 'You are not authorized to access this resource.',
    });     
}

const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
    const user = await userDB.getUserByUsername({ username });
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }
    return user;
};

const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    const sanitizedUsername = xss(username);

    const user = await getUserByUsername({ username: sanitizedUsername });

    const isValidPassword = await bcrypt.compare(password, user.getPassword());

    if (!isValidPassword) {
        throw new Error('Username or password is incorrect');
    }
    return {
        token: generateJwtToken({ username: sanitizedUsername, role: user.getRole() }),
        username: username,
        fullname: `${user.getFirstName()} ${user.getLastName()}`,
        role: user.getRole(),
    };

};
const createUser = async ({
    username,
    password,
    firstName,
    lastName,
    email,
    role,
}: UserInput): Promise<User> => {
    const hashedPassword = await bcrypt.hash(password, 12);

    const sanitizedUsername = xss(username);
    const sanitizedFirstName = xss(firstName);
    const sanitizedLastName = xss(lastName);
    const sanitizedEmail = xss(email);

    const existingUser = await userDB.getUserByUsername({ username: sanitizedUsername });

    if (existingUser) {
        throw new Error(`User with username ${username} is already registered.`);
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
        throw new Error('Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number');
    }

    if(role){
        const user = new User({ username:sanitizedUsername, password: hashedPassword, firstName: sanitizedFirstName, lastName: sanitizedLastName, email: sanitizedEmail, role});
        return await userDB.createUser(user);
    }

    
    const user = new User({ username:sanitizedUsername, password: hashedPassword, firstName: sanitizedFirstName, lastName: sanitizedLastName, email: sanitizedEmail, role: 'participant'});

    return await userDB.createUser(user);
};

export default { getUserByUsername, authenticate, createUser, getAllUsers, getAllUsersNotAdmin, deleteUser };
