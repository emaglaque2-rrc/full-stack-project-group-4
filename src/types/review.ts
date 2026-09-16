export interface Review {
    id: number;
    title: string;
    author: string; // may eventually be used to take a user object depending on how DB users are handled
    product: string;
    body: string;
    rating: number;
    datePosted: Date;
    dateUpdated?: Date;
}    

