import {Router} from "express";
import {reviewController} from "../controllers/reviewControllers.js";

export const reviewRoutes = Router();

reviewRoutes.get("/", reviewController.getAllReviews);

reviewRoutes.get("/:id", reviewController.getReviewById);

reviewRoutes.post("/", validateReviewBody, reviewController.createReview);

reviewRoutes.delete("/:id", reviewController.deleteReview);