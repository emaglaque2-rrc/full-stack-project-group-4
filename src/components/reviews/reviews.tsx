import type { Review } from "../../types/review";
import { useFormInput } from "../../hooks/useFormInput";
import { useState } from "react";
import * as reviewService from "../../services/reviewService"
import "./reviews.css";
import type { Equipment } from "../../types/equipment";

/* 
Displays reviews and renders a form for submitting new reviews 
uses reviewService to validate, create, fetch and delete new reviews
service delegates to reviewRepo to keep business logic separate from render logic
*/ 

// ======== COMPONENT LOGIC =========================================
function RenderReviews({ equipment}: {equipment: Equipment[]}) {
  // ed's implementation of the custom hook takes in objects w/ form fields, so that's what i declare here
  const reviewForm = useFormInput({title: "", rating: 5, author: "", product: "", body: ""})
 
  const [reviewList, setReviewList] = useState<Review[]>(() => reviewService.getAllReviews())
  
  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    let currentDate = new Date().toISOString().split("T")[0];
    // create new review object using values grabbed from custom hook
      const review: Review = {
        id: Date.now(),
        title: reviewForm.values.title,
        rating: reviewForm.values.rating,
        author: reviewForm.values.author,
        product: reviewForm.values.product,
        body: reviewForm.values.body,
        datePosted: currentDate,
      };

      // declare error as the return value of addReview (validateReview)
      // if there is an error, set the error message to that error, else call getAllReviews w/ new review
      const error = reviewService.addReview(review)
      if (error) {
        reviewForm.setErrorMessage(error)
        return
    }

    // call setReviewList w/ getAllReviews from the service & reset form
    setReviewList(reviewService.getAllReviews())
    reviewForm.resetForm()
    
  }

  // call removeReview, passing the relevant review in
  // call deleteReview with the ID of the review, delete review 
  // call setReviewList with the updated review array
  function removeReview(review: Review) {
    reviewService.deleteReview(review.id)
    setReviewList(reviewService.getAllReviews())
  }

  // ============== RENDER =============================
  // only major changes were updating the values within the object that the hook takes in, rather than updating
  // individual useState hooks
  return (
    <>
      <section className="review-container">
        <section className="review-display">
          <h2>Product Reviews</h2>

          {reviewList.map((review) => (
            <article key={review.id}>
              <button onClick={() => removeReview(review)}>Delete</button>
              <h3>
                {review.title} | {review.rating}/10
              </h3>
              <p>Author: {review.author}</p>
              <p>Product: {review.product}</p>
              <p>{review.body}</p>
              <p>Posted on {review.datePosted}</p>
            </article>
          ))}
        </section>

        <form className="review-form" id="reviewForm" onSubmit={handleSubmit}>
          <section className="review-items">
            <h2>Leave a Review:</h2>
            <p id="validationError">{reviewForm.errorMessage}</p>
            {/* title */}
            <label htmlFor="title-field">Title ({reviewForm.values.title.length}/50)</label>
            <input
              type="text"
              name="title"
              id="review-title"
              placeholder="Review Title"
              value={reviewForm.values.title}
              maxLength={50}
              onChange={(e) => reviewForm.setFieldValue("title", e.target.value)}
            />

            {/* rating */}
            <label htmlFor="rating-slider">Rating: {reviewForm.values.rating}/10</label>
            <input
              type="range"
              name="rating"
              id="rating-slider"
              value={reviewForm.values.rating}
              min={1}
              max={10}
              step={1}
              onChange={(e) => reviewForm.setFieldValue("rating", Number(e.target.value))}
            />

            {/* author */}
            <label htmlFor="author-field">Author ({reviewForm.values.author.length}/50)</label>
            <input
              type="text"
              name="author"
              id="review-author"
              placeholder="Name"
              value={reviewForm.values.author}
              maxLength={50}
              onChange={(e) => reviewForm.setFieldValue("author", e.target.value)}
            />

            {/* product */}
            <label htmlFor="product-selection">Product:</label>
            <select
              name="product"
              id=""
              value={reviewForm.values.product}
              onChange={(e) => reviewForm.setFieldValue("product", e.target.value)}
            >
              <option value="">Select Equipment</option>
              {equipment.map((equip) => (
                <option key={equip.id} value={equip.name}>
                  {equip.name}
                </option>
              ))}
            </select>

            {/* body */}
            <label htmlFor="review-body">Body ({reviewForm.values.body.length}/300)</label>
            <textarea
              name="body"
              id="review-body"
              placeholder="What do you think..."
              value={reviewForm.values.body}
              maxLength={300}
              onChange={(e) => reviewForm.setFieldValue("body", e.target.value)}
            />

            <button type="submit">Submit</button>
          </section>
        </form>
      </section>
    </>
  );
}

// This documentation is really for myself, but can still be useful
/*
* THE WHOLE HOG: 
* The page is rendered, along with the review form.
* User-input data is then retrieved by the custom hook, via an on-change event,
* that actively updates the hooks object.
* Upon submission, a review object is created with the relevant data from the hook.
* After this, we call the addReview function, which implicitly calls validation as well.
* If validation returns an error, so will addReview. We assign this error to [const error]
* and if an error IS returned, then we call the setErrorMessage function of the custom hook, 
* setting our error message.
* Otherwise, we call the useState hooks setReviewList, with the value as the return of 
* reviewService.GetAllReviews, which will return the newly updated array, and re-render the page.
* After this, we reset the input form.
* 
* If a review deletion is attempted, we call the removeReview function, which delegates the operation
* to the reviewServices delete review function, and then sets the updated review list to re-render the page.
* 
* 
* TL;DR: Hook -> Service -> Repository
*/
export default RenderReviews;
