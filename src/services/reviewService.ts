import type { Review } from "../types/review";
import * as reviewRepo from "../repositories/reviewRepo"

// will use custom hook for error messages once implemented

export function validateReview(review: Review): string {
    if (!review.title.trim() || !review.author.trim() || !review.body.trim() || !review.product.trim()) {
      return "Please ensure all fields are filled out";
    }

    if (review.title.length > 50){
        return "Title cannot exceed 50 characters"
    }

    if (review.author.length > 50) {
        return "Author name cannot exceed 50 characters"
    }

    if (review.body.length > 300) {
        return "Review body cannot exceed 300 characters"
    }
    return ""
  }

export function getAllReviews(): Review[]