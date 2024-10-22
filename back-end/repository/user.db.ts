import { User } from '../model/user';

const users: User[] = [];

const getUserById = ({ id}: {id: number}): User | null => {
    const user = users.find(l => l.getId() === id);
    return user || null;
};

export default {getUserById};