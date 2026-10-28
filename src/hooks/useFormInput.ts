import { useState } from 'react';

/**
 * Very verbose description of what this hook does, read TLDR at the bottom if you don't want to read the whole thing 8).
 * Manages the field values and displayed error message for a form.
 * 
 * This hook handles presentation state only. DOesn't validate business rules, submit the form,
 * generate IDs, or access a service/repo. The component controls those
 * operations and decides when to call this hook's functions.
 * 
 * Each call creates independent state for a single form. Equipment, User, and Review
 * forms can reuse this hook without sharing state, entered values, or error messages because
 * each call to the hook creates a new state instance.
 * 
 * Intended for flat form values (strings, numbers, and booleans). Updates and resets make shallow
 * copies; nested objects are not deep-copied.
 * 
 * @typeParam TValues - THe shape of the form's values. TypeScript normally 
 * infers this from initialValues, so callers do not need to specify it explicitly.
 * 
 * @param initialValues - Deaults for every field managed by this hook.
 * These initialize the form and are also used by resetForm() to restore the form to its original state.
 * Keep these defaults consistent for a creation form. Passing different defaults does not automatically replace
 * the current field values.
 * 
 * @returns An object containing:
 * - values: Current field values. Bind each input's value/checked prop to its
 * corresponding property so the displayed input follows state.
 * - setFieldValue: Updates one field while preserving the other fields.
 * The field name and new value must match the form's inferred types.
 * - errorMessage: The current form-wide feedback message
 * - setErrorMessage: Sets that feedback. Pass "" to clear it.
 * Updating a field does not automatically clear the error message.
 * - resetForm: Restores the supplied defaults and clears the error.
 * Call this after a successful submission or an intentional reset. And again..
 * It does not clear the error message unless you pass "" as the default.
 * 
 * @example
 * const {
 *  values,
 *  setFieldValue,
 *  errorMessage,
 *  setErrorMessage,
 *  resetForm
 * } = useFormInput({
 *      title: "",
 *      ratings: 5
 * });
 * 
 * // Update individual fields:
 * setFieldValue("title", "ts fire twinnem!!");
 * setFieldValue("ratings", 4);
 * 
 * // Display feedback from the submission/validation flow:
 * setErrorMessage("Unable to save the review.");
 * 
 * // After a successful submission:
 * resetForm(); // Restores the defaults (title -> "", ratings -> 5) and clears the error message(s0).
 * 
 * ****IMPORTANT SOURCE*****:
 * TypeScript reference for Generics and Generic Constraints: 
 * https://www.typescriptlang.org/docs/handbook/2/generics.html
 * https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints
 * 
 * AND AGAIN, TLDR:
 * 1. TValues is our chosen name for a generic type parameter.
 * It represents the shape of this form's values.
 * 
 * 2. "extends object" requires an object type rather than a primitive type (string, number, boolean, etc.) or null/undefined.
 * It allows us to use keyof TValues to get the names of the form's fields, which we need for setFieldValue().
 * 
 * 3. TypeScript infers the fields from the supplied initialValues. For example,
 * { title: "", ratings: 5 } gives us a string title and a numeric rating.
 * 
 * 4. This lets Equipment, User, and Review forms reuse the same hook while retaining their own field names and value types.
 */
export function useFormInput<TValues extends object>(
    initialValues: TValues,
) {

};