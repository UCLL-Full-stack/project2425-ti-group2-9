// import { User } from "../model/user";
// import userDb from "../repository/user.db";
// import { UserInput } from "../types";

// const createUser = ({
//     username,
//     firstName,
//     lastName,
//     email,
//     password,
//     role,
// }: UserInput): User => {
    
//     const existingUser = userDb.getUserByEmail(email);
    
//     if (existingUser) {
//         throw new Error(`User with email ${email} already exists.`);
//     }

//     const user = {
//         username,
//         firstName,
//         lastName,
//         email,
//         password,
//         role,
//     };

//     return userDb.createUser(user);
// };

// const getAllUsers = () => {
//     return userDb.getAllUsers();
// };

// const getUserById = (id: number): User => {
//     const user = userDb.getUserById({ id });
//     if (!user) {
//         throw new Error(`User with id ${id} not found.`);
//     }
//     return user;
// };

// const getUserByEmail = (email: string): User => {
//     const user =  userDb.getUserByEmail(email);
//     if (!user) {
//         throw new Error(`User with email ${email} not found.`);
//     }
//     return user;
// };

// export default {
//     createUser,
//     getAllUsers,
//     getUserById,
//     getUserByEmail,
// };
