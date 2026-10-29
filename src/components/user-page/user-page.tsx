import UserForm from "../user-form/user-form";
import UserInventory from "../user-inventory/user-inventory";
import type { UserPageProps } from "../../types/userPageData";


function UserPage({ equipment, users, setUsers, onAddUser,updateUser, removeRental}:UserPageProps) {


    return(
        <section className="user-page">
            <UserForm 
                users={users} 
                setUsers={setUsers} 
                equipment={equipment ?? []}
                onAddUser={onAddUser}
             />
            <UserInventory users={users}  equipment={equipment ?? []} updateUser={updateUser} removeRental={removeRental} />
        </section>
    );
}

export default UserPage