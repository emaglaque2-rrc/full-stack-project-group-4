import { userRepository } from "../repositories/userRepo";
import type { User } from "../types/user";

// The service handles the business logic for user operations. 
//Receives requests from the hook (useUser) and calls the repository(userRepo) to access or update user data 
export const userService = {
    //Get all users
    async getUsers(): Promise<User[]> {
        return userRepository.getUsers();
    },

    //Only adds a user if the email is not already registered
    async createUser(newUser:User): Promise<User[]> {
        const users = await userRepository.getUsers();

        const emailExists = users.some((user)=> 
            user.userEmail.toLowerCase() ===
            newUser.userEmail.toLowerCase()
        );

        if (emailExists) {
            throw new Error('User with this email already exists')
        }

        return userRepository.createUser(newUser);
    },

    // Updates an existing user
    async updateUser(updatedUser: User): Promise<User[]> {
        return userRepository.updateUser(updatedUser)
    },

    //Removes one rental from the rental list
    async deleteRental(
        userId: User['userId'],
        equipmentId: number
    ): Promise<User[]> {
        return userRepository.deleteRental(userId, equipmentId)
    }
}