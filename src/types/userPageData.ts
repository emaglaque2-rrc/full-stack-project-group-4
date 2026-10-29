import type { User } from "./user"
import type { Equipment } from "./equipment"

//Interface for the props that App,tsx passes to the UserPage component
export interface UserPageProps {
    users: User[];

    // Allows the page or form to update the user list in React State
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    equipment?: Equipment[];
    onAddUser: (newUser: User) => Promise<User[]>;
    updateUser: (updatedUser: User) => Promise<User[]>;
    removeRental: (
        userId: User["userId"],
        equipmentId: number
    ) => Promise<User[]>;
}
