import UserForm from "../user-form/user-form";
import UserInventory from "../user-inventory/user-inventory";
import type { UserProps } from "../../types/userProps";

function UserPage({ users, setUsers}: UserProps) {
    return(
        <section className="user-page">
            <UserForm users={users} setUsers={setUsers} />
            <UserInventory />
        </section>
    );
}

export default UserPage