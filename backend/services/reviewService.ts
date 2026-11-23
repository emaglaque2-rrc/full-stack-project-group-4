

export const reviewService = {

    getAllReviews()  {
        return monsterRepository.getAllReviews();
  },

    getReviewById: (id: number)  {
        return monsterRepository.getReviewById(id);
  },

    async addReview(input: Review)  {
        return monsterRepository.addReview(input);
  },

    removeReview(id: number)  {
        return monsterRepository.removeReview(id);
  }

}