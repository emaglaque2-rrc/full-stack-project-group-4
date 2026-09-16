import users from '../../data/user-info.json';
import "./user-inventory.css";


interface Rental {
    equipmentId:number;
    dateRented: string;
    dateReturned: string;
    status: string;
}


interface User {
    userId: number | string;
    firstName: string;
    lastName?: string;
    userEmail: string;
    rentals: Rental[];
}

export const userData: User[] = users;

function UserInventory() {
    return (
        <section className="user-inventory">
            <h2> User Information</h2>
        </section>
    )
}