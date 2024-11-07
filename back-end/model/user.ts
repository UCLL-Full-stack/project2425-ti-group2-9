import {User as UserPrisma} from '@prisma/client'
export class User {
    private id?: number;
    private username: string;
    private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;

    constructor(user: {
        id?: number;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }) {
        this.validate(user);

        this.id = user.id;
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    validate(user: {
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }) {
        if (!user.username?.trim()) {
            throw new Error('Username is required');
        }
        if (!user.firstName?.trim()) {
            throw new Error('First name is required');
        }
        if (!user.lastName?.trim()) {
            throw new Error('Last name is required');
        }
        if (!user.email?.trim()) {
            throw new Error('Email is required');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
    }

    equals(user: User): boolean {
        return (
            this.username === user.getUsername() &&
            this.firstName === user.getFirstName() &&
            this.lastName === user.getLastName() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword()
        );
    }

    static from({id, username, firstName, lastName, email, password}: UserPrisma){
        return new User({
            id,
            username,
            firstName,
            lastName,
            email,
            password,
        });
    }
}