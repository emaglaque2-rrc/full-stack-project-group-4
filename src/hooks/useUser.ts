import { useState, useEffect, } from "react";
import type { User } from "../types/user"
import { userService } from "../services/userService";

// This is the custom hook that manages user data and connects the service to React components. 
// It calls the user service to load, create, update and remove rentals. 
// Manages the loading state and error messages, and updates the React state when the 
//user data changes
// The hook returns the data and functions so components such as APP.tsx can use them without 
//handling the service calls directly.
function useUsers() {
    const [users, setUsers] = useState<User[]>([]);

    // Tracks where the user data is currently loading
    const [loading, setLoading] = useState(true);

    // Stores Error messages if a user operation fails
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

    //Loads the initial user data when the component using this hook mounts 
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