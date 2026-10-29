import type { User } from "./user"
import type { Equipment } from "./equipment"

export interface UserPageProps {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    equipment?: Equipment[];
    onAddUser: (newUser: User) => Promise<User[]>;
    updateUser: (updatedUser: User) => Promise<User[]>;
    removeRental: (
        userId: User["userId"],
        equipmentId: number
    ) => Promise<User[]>;
}
