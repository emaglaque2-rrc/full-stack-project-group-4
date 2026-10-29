import  './user-inventory.css';
import type { User } from "../../types/user"
import type { UserInventoryProps } from '../../types/userInventoryProps'
import { useState } from 'react';
import { useFormInput } from '../../hooks/useFormInput';


function UserInventory({ users,equipment,updateUser, removeRental }: UserInventoryProps) {

    // stores the user that is being currently edited
    const [editingUser, setEditingUser] = useState<User | null>(null);

    // manages the form values and the validation messages
    const { values, setFieldValue, errorMessage, setErrorMessage,resetForm} = useFormInput({
        firstName: "",
        lastName:"",
        userEmail: "",
        selectedEquipment: "",
        dateRented: "",
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

    // loads the selected user's details into the edit form
    async function handleEdit(user: User) {
        setEditingUser(user);
        setFieldValue("firstName", user.firstName);
        setFieldValue("lastName", user.lastName ?? "");
        setFieldValue("userEmail", user.userEmail);
        setErrorMessage("");
    }

    // Validates the form and saves the updated user details
    async function handleSave(event: React.SubmitEvent<HTMLFormElement>) {
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

        // creates an updated user while keeping their existing rentals
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

    // adds another new rental to the selected  user's rental list
    async function handleAddRental() {
       setErrorMessage("");

        if (!editingUser) return;

        if (!values.selectedEquipment || !values.dateRented) {
            setErrorMessage("Please select equipment and a rental date.");
            return;
        }

        const equipmentId = Number(values.selectedEquipment);

        // Prevents adding the same equipment twice to this user's rentals.
        const alreadyRented = editingUser.rentals.some(
            (rental) => rental.equipmentId === equipmentId
        );

        if (alreadyRented) {
            setErrorMessage("This equipment is already listed for this user.");
            return;
        }

        const newRental = {
            equipmentId: equipmentId,
            dateRented: values.dateRented,
            dateReturned: "",
            status: "In Use",
        };

        const updatedUser: User = {
            ...editingUser,
            rentals: [...editingUser.rentals, newRental],
        };

        try {
            await updateUser(updatedUser);
            setEditingUser(updatedUser);
            setFieldValue("selectedEquipment", "");
            setFieldValue("dateRented", "");
            setErrorMessage("");
        } catch (error) {
            setErrorMessage(
                error instanceof Error ? error.message : "Unable to add rental."
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

                    <h3>Add Rental</h3>

                    <label htmlFor="selectedEquipment">Equipment:</label>
                    <select
                        id="selectedEquipment"
                        value={values.selectedEquipment}
                        onChange={(event) =>
                            setFieldValue("selectedEquipment", event.target.value)
                        }
                        required
                    >
                        <option value="">Select equipment</option>

                        {equipment.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name} (ID: {item.id})
                            </option>
                        ))}
                    </select>

                    <label htmlFor="dateRented">Date Rented:</label>
                    <input
                        id="dateRented"
                        type="date"
                        value={values.dateRented}
                        onChange={(event) =>
                            setFieldValue("dateRented", event.target.value)
                        }
                        required
                    />

                    <button type="button" onClick={handleAddRental}>
                        Add Rental
                    </button>

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
