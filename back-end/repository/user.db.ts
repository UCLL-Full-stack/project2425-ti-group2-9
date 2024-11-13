// import { User } from "../model/user";
// import { Role } from "../types";

// //const users: User[] = [];

// const createUser = ({
//     username,
//     firstName,
//     lastName,
//     email,
//     password,
//     role,
// }: {
//     username: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
//     role: Role; 
// }): User => {
//     const user = new User({
//         username,
//         firstName,
//         lastName,
//         email,
//         password,
//         //role,
//     });

//     users.push(user);
//     return user;
// };

// const getAllUsers = (): User[] => users;

// const getUserById = ({ id}: {id: number}): User | null => {
//     const user = users.find(l => l.getId() === id);
//     return user || null;
// }

// const getUserByEmail = (email: string): User | undefined => {
//     return users.find(user => user.getEmail() === email);
// };

// export default {
//     createUser,
//     getAllUsers,
//     getUserById,
//     getUserByEmail,
// };
