import type { Review } from "../types/review";

// will use custom hook for error messages once implemented

export function validateReview(): boolean {
    if (!title.trim() || !author.trim() || !body.trim() || !product.trim()) {
      return false;
    }

    if (title.length > 50){
        return false
    }

    if (author.length > 50) {
        return false
    }

    if (body.length > 300) {
        return false
    }
    return true
  }