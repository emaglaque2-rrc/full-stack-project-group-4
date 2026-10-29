import type { User } from "./user"
import type { Equipment } from "./equipment"

export interface UserPageProps {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    equipment?: Equipment[];
    onAddUser: (newUser: User) => Promise<User[]>;
}