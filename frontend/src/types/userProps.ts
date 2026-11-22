import type { User } from "./user";
import type { Equipment } from"./equipment"

export interface UserProps {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    equipment?:Equipment []
}