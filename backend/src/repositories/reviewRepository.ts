import type {Review} from "../../../shared/types/review.js"


export const reviewRepository = {

  async getAllReviews() {
    const reviews = await prisma.review.findMany();
    return reviews;
  },

  async getById(id: number) {
    const review = await prisma.review.findUnique({
      where: { id },
    });
    return review;
  },

  // theoretically this works right now, practically it definitely doesn't, but I haven't made schemas yet 
  async addReview(input: Review) {
    const review = await prisma.review.create({
      data: input,
    });
    return review;
  },

  async removeReview(id: number) {
    const review = await prisma.review.delete({
      where: { id },
    });
    return review;
  }




}


