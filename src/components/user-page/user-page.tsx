import UserForm from "../user-form/user-form";
import UserInventory from "../user-inventory/user-inventory";
import type { UserProps } from "../../types/userProps"
import { userService } from "../../services/userService"


function UserPage({ equipment, users, setUsers}:UserProps) {


    return(
        <section className="user-page">
            <UserForm 
                users={users} 
                setUsers={setUsers} 
                equipment={equipment ?? []}
                onAddUser={(newUser) => userService.createUser(newUser)}
             />
            <UserInventory users={users} setUsers={setUsers} />
        </section>
    );
}

export default UserPage