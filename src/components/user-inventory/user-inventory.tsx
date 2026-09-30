import users from '../../data/user-info.json';
import './user-inventory.css';
import type { User, Rental} from "../../types/user"
import type { UserProps } from '../../types/userProps'

export const userData: User[] = users;

function UserInventory({ users, setUsers }: UserProps) {

    function handelRemoveUser(userId: number | string) {
        setUsers(
            users.filter((user) => user.userId !== userId)
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
                                    <button type="button" onClick={() => handelRemoveUser(user.userId)}>Remove User</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

        </section>
    )
}

export default UserInventory
