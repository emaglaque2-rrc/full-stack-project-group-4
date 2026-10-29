import type { User } from '../types/user'
import type { Equipment } from '../types/equipment'

export interface UserFormProps{
    users: User[];
    setUsers: (users: User[]) => void;
    equipment: Equipment[] | undefined;
    onAddUser: (newUser: User) => Promise<User[]>;
}