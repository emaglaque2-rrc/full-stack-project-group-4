import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

// Validate rental information
const rentalSchema = z.object({
    rentalId: z.number().int().positive(),
    equipmentId: z.number().int().positive(),
    dateRented: z.string().date(),
    dateReturned: z.string().date().nullable(),
    status: z.string().min(1)
});

// Validate user information
const userSchema = z.object({
    firstName: z.string().min(3, "First name must be at least 3 characters."),
    lastName: z.string().min(2, "Last name must be at least 2 characters.").optional(),
    userEmail: z.string().email("Please enter a valid email address."),
    rentals: z.array(rentalSchema)
});

// Validate create user request
const validateCreateUser = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const result = userSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({
            message: "Validation failed.",
            errors: result.error.issues
        });
        return;
    }

    req.body = result.data;
    next();
};

// Validate update user request
const validateUpdateUser = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const result = userSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({
            message: "Validation failed.",
            errors: result.error.issues
        });
        return;
    }

    req.body = result.data;
    next();
};

export {
    validateCreateUser,
    validateUpdateUser
};
