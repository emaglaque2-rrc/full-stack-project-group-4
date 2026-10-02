import reviews from "../../data/reviews.json";
import type { equipmentProps } from "../../types/equipmentProps";
import type { Review } from "../../types/review";
import { useState } from "react";
import "./reviews.css";

function RenderReviews({ equipment }: equipmentProps) {
  const [title, setTitle] = useState<string>("");
  const [rating, setRating] = useState<number>(5);
  const [author, setAuthor] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const [validationError, setValidationError] = useState("");
  const [reviewList, setReviewList] = useState(reviews);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    let currentDate = new Date().toISOString().split("T")[0];

    if (title && rating && author && product && body !== null) {
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

  function validateReview() {
    return;
  }

  function addReview(review: Review) {
    setReviewList((reviewList) => {
      return [...reviewList, review];
    });
  }

  return (
    <>
      <section className="review-container">
        <section className="review-display">
          <h2>Product Reviews</h2>

          {reviewList.map((review) => (
            <article key={review.id}>
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

        {/* title */}
        <form className="review-form" id="reviewForm" onSubmit={handleSubmit}>
          <section className="review-items">
            <h2>Leave a Review:</h2>
            <label htmlFor="title-field">Title:</label>
            <input
              type="text"
              name="title"
              id="review-title"
              required
              placeholder="Review Title"
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* rating */}
            <label htmlFor="rating-slider">Rating: {rating}/10</label>
            <input
              type="range"
              name="rating"
              id="rating-slider"
              required
              value={rating}
              min={1}
              max={10}
              step={1}
              onChange={(e) => setRating(Number(e.target.value))}
            />

            {/* author */}
            <label htmlFor="author-field">Author:</label>
            <input
              type="text"
              name="author"
              id="review-author"
              required
              placeholder="Name"
              onChange={(e) => setAuthor(e.target.value)}
            />

            {/* product */}
            <label htmlFor="product-selection">Product:</label>
            <select
              name="product"
              id=""
              required
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
            <label htmlFor="body-field">Body:</label>
            <textarea
              name="body"
              id="review-body"
              required
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
