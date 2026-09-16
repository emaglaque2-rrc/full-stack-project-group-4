import reviews from "../../data/reviews.json"

function RenderReviews() {
    return (
        <section className="review-display">
            <h2>Product Reviews</h2>

            {reviews.map((review) => (
                <article key={review.id}>
                    <h3>{review.title} | {review.rating}/10</h3>
                    <p>Author: {review.author}</p>
                    <p>Product: {review.product}</p>
                    <p>{review.body}</p>
                    <p>Posted on {review.datePosted}</p>
                
                </article>
            ))}
         
        </section>
    )
}

export default RenderReviews