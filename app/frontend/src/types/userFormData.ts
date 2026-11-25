import type { User } from './user'
import type { Equipment } from './equipment'

// Interface for the props that UserPage passes to the UserFOrm component
export interface UserFormProps{
    // Provides the existing users for checking duplicate email addresses and generating a new user ID
    users: User[];
    setUsers: (users: User[]) => void;
    equipment: Equipment[] | undefined;
    onAddUser: (newUser: User) => Promise<User[]>;
}