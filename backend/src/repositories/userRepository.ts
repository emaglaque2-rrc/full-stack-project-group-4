import userData from '../data/userData.json';
import type { User } from '../types/users';

//This is temporary in memory data 
let users: User[] = userData as User[];

//Get all users
const getAllUsers = async (): Promise<User[]> => {
    return users;
}   

//Get user by id
const getUserById = async (userId: number): Promise<User | undefined> => {
    return users.find(user => user.userId === userId);
}   

//Add new user
const createUser = async (newUser: Omit<User, 'userId'>): Promise<User> => {
    const newUserId = users.length > 0 ? Math.max(...users.map(user => user.userId)) + 1 : 1;
    const user: User = { 
        userId: newUserId,
        ...newUser  
     };
    users.push(user);
    return user;
}

//Update user by id
const updateUser = async (updateUser: User): Promise<User | undefined> => {
    const index = users.findIndex(user => user.userId === updateUser.userId);
    
    if (index !== -1) {
        return undefined;
    }
    users[index] = updateUser;
    return users[index];

};

//Delete user by id
const deleteRental = async (userId: number, rentalId: number): Promise<User | undefined> => {
    const user = users.find(user => user.userId === userId);

    if (!user) {
        return undefined;
    }

    const rentalExists = user.rentals.some(
        rental => rental.rentalId === rentalId
    );

    if (!rentalExists) {
        return undefined;
    }

    user.rentals = user.rentals.filter(
        rental => rental.rentalId !== rentalId
    );

    return user;
};

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteRental
};