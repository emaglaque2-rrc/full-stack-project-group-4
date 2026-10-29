import type { Review } from "../../types/review";
import { useState } from "react";
import type { RenderReviewsProps } from "../../types/renderReviewProps";
import "./reviews.css";

function RenderReviews({ equipment, reviewList, setReviewList}: RenderReviewsProps) {
  const [title, setTitle] = useState<string>("");
  const [rating, setRating] = useState<number>(5);
  const [author, setAuthor] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const [validationError, setValidationError] = useState("");

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setValidationError("")
    let currentDate = new Date().toISOString().split("T")[0];

    if (validateReview()) {
      const review: Review = {
        id: Date.now(),
        title: title,
        rating: rating,
        author: author,
        product: product,
        body: body,
        datePosted: currentDate,
      };
      addReview(review);
    }
  }

  function validateReview(): boolean {
    if (!title.trim() || !author.trim() || !body.trim() || !product.trim()) {
      setValidationError("Please fill out all fields.");
      return false;
    }

    if (title.length > 50){
        setValidationError(`Title must not exceed 50 characters. (${title.length})`)
        return false
    }

    if (author.length > 50) {
        setValidationError(`Author name must not exceed 50 characters. (${author.length})`)
    }

    if (body.length > 300) {
        setValidationError(`Review body must not exceed 300 characters. (${body.length})`)
        return false
    }
    return true
  }

  function addReview(review: Review) {
    setReviewList((reviewList) => {
      return [...reviewList, review];
    });
  }


  // Courtesy of https://stackoverflow.com/questions/63948123/remove-item-from-an-array-usestate-hook
  function removeReview(review: Review){
    const idToRemove = review.id // Grab ID of clicked review
    const index = reviewList.findIndex(({id}) => id === idToRemove) // Find idToRemove by destructuring each review and comparing ID. if true, return index
    if(index !== -1) { // findIndex returns -1 if it can't find the index
      setReviewList([
        ...reviewList.slice(0, index),
        ...reviewList.slice(index + 1)
      ]) // Combine slices so that everything BEFORE and AFTER the indexTBD is included, with the index to be deleted being removed. Then, return both slices as the new array.
    }
  }

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
            <p id="validationError">{validationError}</p>
            {/* title */}
            <label htmlFor="title-field">Title ({title.length}/50)</label>
            <input
              type="text"
              name="title"
              id="review-title"
              placeholder="Review Title"
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* rating */}
            <label htmlFor="rating-slider">Rating: {rating}/10</label>
            <input
              type="range"
              name="rating"
              id="rating-slider"
              value={rating}
              min={1}
              max={10}
              step={1}
              onChange={(e) => setRating(Number(e.target.value))}
            />

            {/* author */}
            <label htmlFor="author-field">Author ({author.length}/50)</label>
            <input
              type="text"
              name="author"
              id="review-author"
              placeholder="Name"
              onChange={(e) => setAuthor(e.target.value)}
            />

            {/* product */}
            <label htmlFor="product-selection">Product:</label>
            <select
              name="product"
              id=""
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="">Select Equipment</option>
              {equipment.map((equip) => (
                <option key={equip.id} value={equip.name}>
                  {equip.name}
                </option>
              ))}
            </select>

            {/* body */}
            <label htmlFor="review-body">Body ({body.length}/300)</label>
            <textarea
              name="body"
              id="review-body"
              placeholder="What do you think..."
              onChange={(e) => setBody(e.target.value)}
            />

            <button type="submit">Submit</button>
          </section>
        </form>
      </section>
    </>
  );
}

export default RenderReviews;
