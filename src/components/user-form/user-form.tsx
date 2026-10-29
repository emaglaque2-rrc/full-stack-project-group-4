// The form that will allow user details to be entered and also add or remove a user
import type React from "react";
import type { Rental } from "../../types/user";
import type { UserFormProps } from "../../types/userFormData";
import { useFormInput } from "../../hooks/useFormInput";

function UserForm({ users, setUsers, equipment, onAddUser }: UserFormProps) {

    // Reuses the shared form hook to manage input values, error messages, and resetting 
    //the form instead of managing each field separately.
    const { values, setFieldValue, errorMessage, setErrorMessage, resetForm } = useFormInput({
        firstName: "",
        lastName: "",
        userEmail: "",
        dateRented: "",
        selectedEquipment: "",
    });

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setErrorMessage("");

        if (values.firstName.trim().length < 3) {
            setErrorMessage("First name must be atleast 3 characters");
            return;
        }

        if (values.lastName.trim().length < 2) {
            setErrorMessage("Last name must be atleast 2 characters");
            return;
        }

        if (!values.userEmail.includes("@")) {
            setErrorMessage("Enter a valid email address");
            return;
        }

        if (!values.dateRented) {
            setErrorMessage("Enter the rental date");
            return;
        }

        if (!values.selectedEquipment) {
            setErrorMessage("Please select an equipment");
            return;
        }

        const newRental: Rental = {
            equipmentId: Number(values.selectedEquipment),
            dateRented: values.dateRented,
            dateReturned: "",
            status: "In Use",
        };

        const newUser = {
            userId: Math.max(0, ...users.map((user) => Number(user.userId))) + 1,
            firstName: values.firstName.trim(),
            lastName: values.lastName.trim(),
            userEmail: values.userEmail.trim(),
            rentals: [newRental],
        };

        try {
            const updatedUsers = await onAddUser(newUser);
            setUsers(updatedUsers);
            resetForm();
        } catch (error) {
            setErrorMessage(
                error instanceof Error
                ? error.message
                : "Unable to add user. Please try again"
            )
        }
    }

    return (
        <section className="user-form">
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={values.firstName}
                        onChange={(event) => setFieldValue("firstName", event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={values.lastName}
                        onChange={(event) => setFieldValue("lastName", event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="userEmail">Email:</label>
                    <input
                        type="email"
                        id="userEmail"
                        name="userEmail"
                        value={values.userEmail}
                        onChange={(event) => setFieldValue("userEmail", event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="dateRented">Date Rented:</label>
                    <input
                        type="date"
                        id="dateRented"
                        name="dateRented"
                        value={values.dateRented}
                        onChange={(event) => setFieldValue("dateRented", event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="equipment">Equipment:</label>
                    <select
                        id="equipment"
                        name="equipment"
                        value={values.selectedEquipment}
                        onChange={(event) => setFieldValue("selectedEquipment", event.target.value)}
                    >
                        <option value="">Select Equipment</option>
                        {equipment?.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                {errorMessage && <p>{errorMessage}</p>}

                <button type="submit">Add User</button>
            </form>
        </section>
    );
}

export default UserForm;