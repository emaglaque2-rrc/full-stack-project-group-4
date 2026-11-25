import userRepository from '../repositories/userRepository';
import type { User } from '../types/users';

//Get all users
const getAllUsers = async (): Promise<User[]> => {
    return userRepository.getAllUsers();
}

//Get user by id
const getUserById = async (userId: number): Promise<User | undefined> => {
    return userRepository.getUserById(userId);
}

//Add new user
const createUser = async (newUser: Omit<User, "userId">): Promise<User> => {
    const users = await userRepository.getAllUsers();

    const existingUser = users.find(
        user => user.userEmail === newUser.userEmail
    );

    if (existingUser) {
        throw new Error("A user with this email already exists.");
    }

    return await userRepository.createUser(newUser);
};

//Update user by id
const updateUser = async (updatedUser: User): Promise<User | undefined> => {
    const users = await userRepository.getAllUsers();

    const existingUser = users.find(
        user =>
            user.userEmail === updatedUser.userEmail &&
            user.userId !== updatedUser.userId
    );

    if (existingUser) {
        throw new Error("This email exists");   
    }

    return await userRepository.updateUser(updatedUser);
};
  

//Delete user by id 
const deleteRental = async (userId: number, rentalId: number): Promise<User | undefined> => {   
    return userRepository.deleteRental(userId, rentalId);
}

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteRental
}
