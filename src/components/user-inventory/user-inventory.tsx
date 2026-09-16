import users from '../../data/user-info.json';

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
        <main>
            <h2> User Information</h2>
        </main>
    )
}

export default UserInventory