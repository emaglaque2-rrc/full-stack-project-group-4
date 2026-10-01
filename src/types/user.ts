// interface for both user and rentals they will rent 

export interface Rental {
    equipmentId:number;
    dateRented: string;
    dateReturned: string;
    status: string;
}


export interface User {
    userId: number | string;
    firstName: string;
    lastName?: string;
    userEmail: string;
    rentals: Rental[];
}
