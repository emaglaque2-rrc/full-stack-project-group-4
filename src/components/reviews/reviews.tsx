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
function RenderReviews({ equipment}: {equipment: Equipment[]}) {
  // ed's implementation of the custom hook takes in objects w/ form fields, so that's what i declare here
  const reviewForm = useFormInput({title: "", rating: 5, author: "", product: "", body: ""})
  // placeholder for now while I finish other logic & documentation. I still need to replace json data with a ts file
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
    // The current implementation uses a separate useState hook (which is BAD)
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

  // only major changes were updating the values within the object that the hook takes in
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
              onChange={(e) => reviewForm.setFieldValue("body", e.target.value)}
            />

            <button type="submit">Submit</button>
          </section>
        </form>
      </section>
    </>
  );
}

export default RenderReviews;
