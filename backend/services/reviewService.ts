import {reviewRepository} from "../repositories/reviewRepository.js";
import type {Review} from "../../shared/types/review.js"
export const reviewService = {

    getAllReviews()  {
        return reviewRepository.getAllReviews();
  },

    getReviewById(id: number)  {
        return reviewRepository.getById(id);
  },

    async addReview(input: Review)  {
        return reviewRepository.addReview(input);
  },

    removeReview(id: number)  {
        return reviewRepository.removeReview(id);
  }

}