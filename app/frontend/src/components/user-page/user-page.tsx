import UserForm from "../user-form/user-form";
import UserInventory from "../user-inventory/user-inventory";
import type { UserPageProps } from "../../types/userPageData";

// This connects the user form and user inventory
//It receives user data and function through props, then passes the required
//information to each child component
function UserPage({ equipment, users, setUsers, onAddUser,updateUser, removeRental}:UserPageProps) {


    return(
        <section className="user-page">
            {/*Passes the user data and equipment to the form for adding users.*/}
            <UserForm 
                users={users} 
                setUsers={setUsers} 
                equipment={equipment ?? []}
                onAddUser={onAddUser}
             />

            {/* Passes the user data and functions for editing users and managing rentals*/}
            <UserInventory users={users}  equipment={equipment ?? []} updateUser={updateUser} removeRental={removeRental} />
        </section>
    );
}

export default UserPage