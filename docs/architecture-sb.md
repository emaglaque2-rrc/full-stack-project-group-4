# Architectural Layout for Red River Rentals Review System

## Repository - reviewRepo.ts
### What does it do?
reviewRepo largely manages the collection of reviews, initializing the collection
from the sample data, and providing simple functions, like creating, retrieving and deleting reviews.

### Separation of concerns + logic decisions
the review repo keeps the data handling separate from the rendering and business logic. The repo generally performs operations that are called from the service, with the service handling business rules and deciding which operations need to happen. This accurately separates concerns, because no real business logic is handled in the repo, only what happens to the data before & after business logic is applied.

### Where and why this implementation is used
This implementation is used most times you call a reviewService function, as the service delegates most operations to the repository and returns the results. This was done as a way to improve future scalability and make the architecture easier to interface with by allowing us to call all of our functions through reviewService which keeps implementation simple, and still allows us to add business logic to each function if we choose to.

## Service - reviewService.ts
### What does it do?
the review service largely handles business logic, and which operations should be performed on data, and delegates those operations to the repository. For example, during the addReview() function within the service, operations are first delegated to validateReview() within the same file to apply business validation to the data. If this validation fails, an error is returned, and if it returns successfully, the creation of the review is delegated to a function within the repo. 

The same will apply for most of our operations, with the relevant service function being called first, and handling logic, such as whether or not a relevant ID or review object exists, and will then delegate the actual data handling to the repository.

### Separation of concerns + logic decisions
The separation of concerns occurs in that the service does not directly modify any data, but rather applies logic & validation to the data, after which successful operations will then be delegated to the repo for actual data handling, creation & return.

My primary decision-making process when it came to creating the service was taking into account what we might want business logic applied to, and what would generally make active development easier. Overall, I delegate most of the data handling functionality of the review feature to the repo from the service, because I found that it was efficient overall, as all functions can be accessed from reviewService, without breaking separation of concerns, while also allowing much easier expansion of our business logic for the future, as the functions already have a place within the review service. This allows us to keep implementations within components virtually the same, while still being able to change the underlying logic behind each function call.

### Where and why this implementation was used
This implementation is used almost every time we need to handle data within our component. When adding, deleting or fetching reviews, the operation first runs through the service to have business logic applied, before being delegated to the repository for creation, deletion, or retrieval.
