// interface for both user and rentals they will rent 

export interface Rental {
    rentalId: number;
    equipmentId:number;
    dateRented: string;
    dateReturned: string | null;
    status: string;
}


export interface User {
    userId: number;
    firstName: string;
    lastName?: string;
    userEmail: string;
    rentals: Rental[];
}
