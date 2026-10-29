import type { User } from "./user"
import type { Equipment } from "./equipment"

//Interface for the props required by the UserInventory component
export interface UserInventoryProps {
    users: User[];
    equipment: Equipment[];

    //Passes rhe function used to update user details and add rental
    // connects to the custom hook and service
    updateUser: (updatedUser: User) => Promise<User[]>;

    // Passes the function used to remove a rental
    removeRental: (
        userId: User['userId'],
        equipmentId: number
    ) => Promise<User[]>;
}