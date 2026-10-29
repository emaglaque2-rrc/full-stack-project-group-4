import { useState, useEffect, } from "react";
import type { User } from "../types/user"
import { userService } from "../services/userService";

function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const[errorMessage, setErrorMessage] = useState("");

    async function loadUsers() {
        try {
            setLoading(true);
            setErrorMessage("");

            const loadedUsers = await userService.getUsers();
            setUsers(loadedUsers);
        } catch (error) {
            setErrorMessage(
                error instanceof Error
                ? error.message
                : "Unable to load users"
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadUsers();
    }, []);

    async function createUser(newUser: User) : Promise<User[]> {
        const updatedUsers = await userService.createUser(newUser);
        setUsers(updatedUsers);
        return updatedUsers;
    }

    async function updateUser(updatedUser: User): Promise<User[]> {
        const updatedUsers = await userService.updateUser(updatedUser);
        setUsers(updatedUsers);
        return updatedUsers;
    }

    async function removeRental(
        userId: User["userId"],
        equipmentId: number
    ): Promise<User[]> {
        const updatedUsers = await userService.deleteRental(
            userId,
            equipmentId
        );
        setUsers(updatedUsers);
        return updatedUsers;
    }

    return {
        users,
        setUsers,
        loading,
        errorMessage,
        createUser,
        updateUser,
        removeRental,
        reloadUsers: loadUsers,
    };
}
        

export default useUsers;