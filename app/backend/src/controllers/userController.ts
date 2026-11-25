import type { Request, Response } from "express";
import userService from "../services/userService";

// Get all users
const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving users."
        });
    }
};

// Get user by ID
const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = Number(req.params.id);

        if (isNaN(userId)) {
            res.status(400).json({ message: "Invalid user ID." });
            return;
        }

        const user = await userService.getUserById(userId);

        if (!user) {
            res.status(404).json({ message: "User not found." });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving user."
        });
    }
};

// Create user
const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const newUser = await userService.createUser(req.body);

        res.status(201).json(newUser);
    } catch (error) {
        if (error instanceof Error &&
            error.message.includes("already exists")) {
            res.status(409).json({ message: error.message });
            return;
        }

        res.status(500).json({ message: "Error creating user." });
    }
};

// Update user
const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = Number(req.params.id);

        if (isNaN(userId)) {
            res.status(400).json({ message: "Invalid user ID." });
            return;
        }

        const updatedUser = {
            ...req.body,
            userId
        };

        const user = await userService.updateUser(updatedUser);

        if (!user) {
            res.status(404).json({ message: "User not found." });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error &&
            error.message.includes("already uses")) {
            res.status(409).json({ message: error.message });
            return;
        }

        res.status(500).json({ message: "Error updating user." });
    }
};

// Delete a rental
const deleteRental = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = Number(req.params.userId);
        const rentalId = Number(req.params.rentalId);

        if (isNaN(userId) || isNaN(rentalId)) {
            res.status(400).json({ message: "Invalid user or rental ID." });
            return;
        }

        const user = await userService.deleteRental(userId, rentalId);

        if (!user) {
            res.status(404).json({ message: "User or rental not found." });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error deleting rental." });
    }
};

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteRental
};
