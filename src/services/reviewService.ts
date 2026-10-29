import type { Review } from "../types/review";
import * as reviewRepo from "../repositories/reviewRepo"

// go thru normal validation rules, return relevant error, or return a blank string if validation passes
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

// receive review, pass it to validate review. if fails, return relevant error message, else delegate review creation to repo
export function addReview(review: Review) {
    const error = validateReview(review)

    if(error) {
        return error
    }

    reviewRepo.createReview(review)
    return ""
}

// These functions only currently exist in the service to provide a consistent interface + scalability for future features
// This allows us to call these functions via reviewService, and also add business logic later if we choose to
// ie. allows us to start only retrieving recent reviews, or only allow deletion of reviews older than a certain time period

// In general this basically only exists for me because I find this extremely confusing and like being able to call my functions from one service.

// delegate to repo
export function getAllReviews() {
    return reviewRepo.getAllReviews() 
}

// delegate to repo
export function getReviewById(id: number): Review | undefined{
     return reviewRepo.getReviewById(id)
}

// delegate to repo for removeReview function
export function deleteReview(id: number) {
    return reviewRepo.removeReview(id)
}