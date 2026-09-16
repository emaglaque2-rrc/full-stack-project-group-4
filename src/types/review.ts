export interface Review {
    id: number;
    title: string;
    author: string; // may
    product: string;
    body: string;
    rating: number;
    datePosted: Date;
    dateUpdated?: Date;
}    

