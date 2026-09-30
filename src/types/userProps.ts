import type { User } from "./user";

export interface UserProps {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}