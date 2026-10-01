import UserForm from "../user-form/user-form";
import UserInventory from "../user-inventory/user-inventory";
import type { Equipment } from "../../types/equipment"
import { useState } from "react"
import userData from "../../data/user-info.json"
import type { User } from "../../types/user"


function UserPage({ equipment}: {equipment:Equipment[]}) {

    const [users, setUsers] = useState<User[]>(userData);

    return(
        <section className="user-page">
            <UserForm users={users} setUsers={setUsers} equipment={equipment} />
            <UserInventory users={users} setUsers={setUsers} />
        </section>
    );
}

export default UserPage