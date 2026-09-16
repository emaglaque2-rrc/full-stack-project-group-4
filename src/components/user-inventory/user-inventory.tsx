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
        <section className="user-inventory">
            <h2> User Information</h2>
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
                    </tr>
                </thead>

                <tbody>
                    {userData.map((user) =>
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
                            </tr>
                        ))}
                </tbody>
            </table>

        </section>
    )
}

export default UserInventory
