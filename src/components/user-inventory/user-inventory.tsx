import  './user-inventory.css';
import type { User } from "../../types/user"
import type { UserInventoryProps } from '../../types/userInventoryProps'
import { useState } from 'react';
import { useFormInput } from '../../hooks/useFormInput';


function UserInventory({ users,updateUser, removeRental }: UserInventoryProps) {

    const [editingUser, setEditingUser] = useState<User | null>(null);

    const { values, setFieldValue, errorMessage, setErrorMessage,resetForm} = useFormInput({
        firstName: "",
        lastName:"",
        userEmail: "",
    })

    //Remove a rental through the hook and service
    async function handleRemoveRental(
        userId: User["userId"],
        equipmentId: number
    ) {
        try {
            await removeRental(userId, equipmentId);
        } catch (error) {
            console.error("Unable to remove rental:", error);
        }
    }

    async function handleEdit(user: User) {
        setEditingUser(user);
        setFieldValue("firstName", user.firstName);
        setFieldValue("lastName", user.lastName ?? "");
        setFieldValue("userEmail", user.userEmail);
        setErrorMessage("");
    }

    async function handleSave(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErrorMessage("");

        if (!editingUser) return;

        if (values.firstName.trim().length < 3) {
            setErrorMessage("First name must be at least 3 characters.");
            return;
        }

        if (values.lastName.trim().length < 2) {
            setErrorMessage("Last name must be at least 2 characters.");
            return;
        }

        if (!values.userEmail.includes("@")) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        const updatedUser: User = {
            ...editingUser,
            firstName: values.firstName.trim(),
            lastName: values.lastName.trim(),
            userEmail: values.userEmail.trim(),
        };

        try {
            await updateUser(updatedUser);
            setEditingUser(null);
            resetForm();
        } catch (error) {
            setErrorMessage(
                error instanceof Error ? error.message : "Unable to update user."
            );
        }
    }

    return (
        <section className="user-inventory">
            <h2> User Information</h2>
            {editingUser && (
                <form onSubmit={handleSave}>
                    <h3>Edit User #{editingUser.userId}</h3>

                    <label htmlFor="editFirstName">First Name:</label>
                    <input
                        id="editFirstName"
                        value={values.firstName}
                        onChange={(event) =>
                            setFieldValue("firstName", event.target.value)
                        }
                        required
                    />

                    <label htmlFor="editLastName">Last Name:</label>
                    <input
                        id="editLastName"
                        value={values.lastName}
                        onChange={(event) =>
                            setFieldValue("lastName", event.target.value)
                        }
                        required
                    />

                    <label htmlFor="editEmail">Email:</label>
                    <input
                        id="editEmail"
                        type="email"
                        value={values.userEmail}
                        onChange={(event) =>
                            setFieldValue("userEmail", event.target.value)
                        }
                        required
                    />

                    {errorMessage && <p role="alert">{errorMessage}</p>}

                    <button type="submit">Save Changes</button>

                    <button
                        type="button"
                        onClick={() => {
                            setEditingUser(null);
                            resetForm();
                        }}
                    >
                        Cancel
                    </button>
                </form>
            )}
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Equipment ID</th>
                        <th>Date Rented</th>
                        <th>Date Returned</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) =>
                        user.rentals.map((rental) =>
                            <tr key={`${user.userId}-${rental.equipmentId}`}>
                                <td>{user.userId}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.userEmail}</td>
                                <td>{rental.equipmentId}</td>
                                <td>{rental.dateRented}</td>
                                <td>{rental.dateReturned}</td>
                                <td>{rental.status}</td>

                                <td>
                                    <button type="button" onClick={() => handleEdit(user)}> Edit User</button>
                                    <button type="button" onClick={() => handleRemoveRental(user.userId, rental.equipmentId)}>Remove Rental</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

        </section>
    )
}

export default UserInventory
