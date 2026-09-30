import reviews from "../../data/reviews.json"
import type { equipmentProps } from "../../types/equipmentProps"
import type { Review } from "../../types/review"
import { useState } from "react"
import "./reviews.css"

function RenderReviews({equipment}: equipmentProps) {
    const [title, setTitle] = useState<string>("")
    const [rating, setRating] = useState<number>()
    const [author, setAuthor] = useState<string>("")
    const [product, setProduct] = useState<string>("")
    const [body, setBody] = useState<string>("")

        function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
            e.preventDefault()

            let currentDate = new Date()
            currentDate.toISOString().split('T')[0]
            if (title && rating && author && product && body !== null) {
                const review: Review = {
                    id: Date.now(),
                    title: title,
                    rating: rating,
                    author: author,
                    product: product,
                    body: body,
                    datePosted: currentDate
                }
                console.log(review)
            }
        }

    return (
        <>
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

        <form id="reviewForm" onSubmit={handleSubmit}>
            <label htmlFor="title-field">Title:</label>
            <input type="text" name="title" id="review-title" placeholder="Review Title" onChange={(e) => setTitle(e.target.value)}/>
            
            <label htmlFor="rating-slider">Rating:</label>
            <input type="range" name="rating" id="rating-slider" min={1} max={10} step={1} onChange={(e) => setRating(Number(e.target.value))}/>

            <label htmlFor="author-field">Author:</label>
            <input type="text" name="author" id="review-author" placeholder="Name" onChange={(e) => setAuthor(e.target.value)}/>

            <label htmlFor="product-selection">Product:</label>
            <select name="product" id="" onChange={(e) => setProduct(e.target.value)}>
                <option value="">Select Equipment</option>
                {equipment.map(equip => (
                    <option key={equip.id} value={equip.name}>{equip.name}</option>
                ))}
            </select>

            <label htmlFor="body-field">Body:</label>
            <input type="text" name="body" id="review-body" placeholder="What do you think..." onChange={(e) => setBody(e.target.value)}/>

            <button type="submit">Submit</button>
        </form>
        </>


    )

}

export default RenderReviews