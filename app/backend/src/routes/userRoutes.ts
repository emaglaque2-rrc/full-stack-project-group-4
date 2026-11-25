import { Router } from "express";
import userController from "../controllers/userController";
import { validateCreateUser, validateUpdateUser } from "../validations/userValidation";

const router = Router();

// Get all users
router.get("/", userController.getAllUsers);

// Get user by ID
router.get("/:id", userController.getUserById);

// Create a new user
router.post("/", validateCreateUser, userController.createUser);

// Update an existing user
router.put("/:id", validateUpdateUser, userController.updateUser);

// Delete a specific rental
router.delete(
    "/:userId/rentals/:rentalId",
    userController.deleteRental
);

export default router;
