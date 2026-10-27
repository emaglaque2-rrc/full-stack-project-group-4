import type { Review } from "../types/review";

// will use custom hook for reviewList once implemented 
export function createReview(review: Review) {
    setReviewList((reviewList) => {
        return [...reviewList, review];
    });
  }

  // Courtesy of https://stackoverflow.com/questions/63948123/remove-item-from-an-array-usestate-hook
export function removeReview(review: Review){
    const idToRemove = review.id // Grab ID of clicked review
    const index = reviewList.findIndex(({id}) => id === idToRemove) // Find idToRemove by destructuring each review and comparing ID. if true, return index
    if(index !== -1) { // findIndex returns -1 if it can't find the index
      setReviewList([
        ...reviewList.slice(0, index),
        ...reviewList.slice(index + 1)
      ]) // Combine slices so that everything BEFORE and AFTER the indexTBD is included, with the index to be deleted being removed. Then, return both slices as the new array.
    }
  }