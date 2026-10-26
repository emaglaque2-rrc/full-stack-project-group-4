import users from '../../data/user-info.json';
import  './user-inventory.css';
import type { User } from "../../types/user"
import type { UserProps } from '../../types/userProps'

export const userData: User[] = users;

function UserInventory({ users, setUsers }: UserProps) {

    function handelRemoveRental(userId: number | string, equipmentId: number) {
        setUsers(
            users.map((user) => {
                if (user.userId === userId) {
                    return {
                        ...user,
                        rentals: user.rentals.filter((rental) => rental.equipmentId !== equipmentId)
                    };
                }
                return user;
            })
        )
    }

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
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) =>
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

                                <td>
                                    <button type="button" onClick={() => handelRemoveRental(user.userId, rental.equipmentId)}>Remove Rental</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

        </section>
    )
}

export default UserInventory
