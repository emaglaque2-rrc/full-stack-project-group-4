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