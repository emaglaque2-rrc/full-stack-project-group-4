// The form that will allow user details to be entered and also add or remove a user

import { useState } from "react";
import type { UserProps } from "../../types/userProps";
import type { Rental } from "../../types/user";


function UserForm ({users, setUsers,equipment}: UserProps) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [dateRented, setDateRented] = useState("");
    const [selectedEquipment, setSelectedEquipment] = useState("");
    const [validationMessage, setValidationMessage] = useState("");

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setValidationMessage('');

        if(firstName.trim().length < 3){
            setValidationMessage('First name must be atleast 3 characters')
            return
        }

        if(lastName.trim().length < 2){
            setValidationMessage('Last name must be atleast 2 characters')
            return
        }

        if(!userEmail.includes('@')){
            setValidationMessage('Enter a valid email address')
            return
        }

        if(!dateRented) {
            setValidationMessage('Enter the rental date')
            return
        }

        if(!selectedEquipment){
            setValidationMessage('Please select an equipment')
            return
        }

        const newRental: Rental = {
            equipmentId: Number(selectedEquipment),
            dateRented: dateRented,
            dateReturned: "",
            status: "In Use"
        };

        const newUser = {
            userId: Math.max(...users.map((user)=>Number(user.userId))) + 1,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            userEmail:userEmail.trim(),
            rentals: [newRental]
        };

        setUsers([...users,newUser]);

        setFirstName("");
        setLastName("");
        setUserEmail("");
        setDateRented("");
        setSelectedEquipment("");
    }

    return (
        <section className="user-form">
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" value={firstName} onChange={(event) =>
                        setFirstName(event.target.value)
                    } />
                </div>

                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" value={lastName} onChange={(event) =>
                        setLastName(event.target.value)
                    } />
                </div>

                <div>
                    <label htmlFor="userEmail">Email:</label>
                    <input type="email" id="userEmail" name="userEmail" value={userEmail} onChange={(event) =>
                        setUserEmail(event.target.value)
                    } />
                </div>

                <div>
                    <label htmlFor="dateRented">Date Rented:</label>
                    <input type="date" id="dateRented" name="dateRented" value={dateRented} onChange={(event) =>
                        setDateRented(event.target.value)
                    } />
                </div>

                <div>
                    <label htmlFor="equipment">Equipment:</label>
                    <select id="equipment" name="equipment" value={selectedEquipment} onChange={(event) =>
                        setSelectedEquipment(event.target.value)
                    } >
                        <option value="">Select Equipment</option>

                        {equipment?.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                
                {validationMessage && (<p>{validationMessage}</p>)}

                <button type="submit">Add User</button>
            
            </form>
        </section>
    );
    
}

export default UserForm