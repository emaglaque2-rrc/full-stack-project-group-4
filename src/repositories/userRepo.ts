import userData from '../data/user-info.json'
import type { User } from '../types/user'

let users: User[] = userData.map((user) => ({
    ...user,
    rentals: user.rentals.map((rental) => ({
        ...rental
    })),
}));

export const userRepository = {
    //Gets all users
    async getUsers(): Promise<User[]> {
        return users.map((user) => ({
            ...user,
            rentals: user.rentals.map((rental) => ({
                ...rental
            })),
        }));
    },

    //Gets user by Id
    async getUserById(userId: User['userId']): Promise<User | undefined> {
        const user = users.find((user) =>
            String(user.userId) === String(userId)
        );

        if (!user) {
            return undefined;
        }

        return {
            ...user,
            rentals: user.rentals.map((rental) => ({
                ...rental
            })),
        };
    },

    // Creates a new user
    async createUser(newUser: User): Promise<User[]>{
        users = [
            ...users,
            {
                ...newUser,
                rentals: newUser.rentals.map((rental) => ({
                    ...rental
                })),
            },
        ];

        return this.getUsers();
    },

    //Updates an existing user
    async updateUser(updatedUser: User): Promise<User[]> {
        users = users.map((user) => {
            if(String(user.userId) === String(updatedUser.userId)) {
                return {
                    ...updatedUser,
                    rentals: updatedUser.rentals.map((rental) => ({
                        ...rental
                    })),
                };
            }

            return user;
        });

        return this.getUsers();
    },

    //Deletes one rental from a user's list
    async deleteRental(
        userId: User['userId'],
        equipmentId: number
    ): Promise<User[]> {
        users = users.map((user) => {
            if (String(user.userId) === String(userId)) {
                return {
                    ...user,
                    rentals: user.rentals.filter(
                        (rental) => rental.equipmentId !== equipmentId
                    ),
                };
            }

            return user;
        });

        return this.getUsers();
    }
}


