import type { Review } from "./review";
import type { Equipment } from "./equipment";

export interface RenderReviewsProps {
    equipment: Equipment[];
    reviewList: Review[];
    setReviewList: React.Dispatch<React.SetStateAction<Review[]>>;
}