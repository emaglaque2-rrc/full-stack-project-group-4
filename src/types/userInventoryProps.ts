import type { User } from "./user"

export interface UserInventoryProps {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    updateUser: (updatedUser: User) => Promise<User[]>;
    removeRental: (
        userId: User['userId'],
        equipmentId: number
    ) => Promise<User[]>;
}