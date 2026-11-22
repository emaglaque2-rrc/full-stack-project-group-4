import type {Request, Response} from 'express';

export const reviewController = {

  getAllReviews: async (req: Request, res: Response) => {
    const reviews = await reviewService.getAllReviews();
    res.json(reviews);
  },

  getReviewById: async (req: Request, res: Response) => {
    const review = await reviewService.getReviewById(req.params.id);

    if(!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json(review)
  },

  createReview: async (req: Request, res: Response) => {
    const review = await reviewService.createReview(req.body);
    
    res.status(201).json(review);
  },

  deleteReview: async (req: Request, res: Response) => {
    const removed = await reviewService.deleteReview(req.params.id);

    if(!removed) {
      return res.status(404).json({ Error: 'Review not found' });
    }

    res.sendStatus(204);
  }
}