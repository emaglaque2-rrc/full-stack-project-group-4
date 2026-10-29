import type { User } from "./user"
import type { Equipment } from "./equipment"

export interface UserInventoryProps {
    users: User[];
    equipment: Equipment[];
    updateUser: (updatedUser: User) => Promise<User[]>;
    removeRental: (
        userId: User['userId'],
        equipmentId: number
    ) => Promise<User[]>;
}