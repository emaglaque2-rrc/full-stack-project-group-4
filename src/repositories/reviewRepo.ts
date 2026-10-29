import type { Review } from "../types/review";
import reviewData from "../data/reviews.json"

// Followed the demo code or some variation of it for the majority of these

// Pull review data from reviews.json
let reviews: Review[] = [...reviewData]

// array spread & return all reviews
export function getAllReviews(): Review[]{
  return [...reviews]
}

// call w/ id, and use .find to return first item in the array that meets condition
export function getReviewById(id: number) {
  return reviews.find((review) => review.id === id)
}

// call w/ a new review object, append new review to reviews array, and return the review
export function createReview(review: Review) {
  reviews = [...reviews, review]
  return review
}

// call w/ id, use .filter to retrieve reviews, excluding review to be deleted
export function removeReview(id: number) {
  const reviewExists = reviews.some((review) => review.id === id)

  reviews = reviews.filter((review) => review.id !== id)

  return reviewExists
}