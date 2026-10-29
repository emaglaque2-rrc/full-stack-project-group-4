import { useState } from 'react';

/**
 * ***NOTE: Very verbose description of what this hook does, read TLDR at the bottom if you don't want to read the whole thing 8).
 * 
 * Manages the field values and displayed error message for a form.
 * 
 * This hook handles presentation state only. DOesn't validate business rules, submit the form,
 * generate IDs, or access a service/repo. The component controls those
 * operations and decides when to call this hook's functions.
 * 
 * Each component using this hook has its own form state. Equipment, User, and Review
 * forms can reuse the hook without sharing values, error messages, or reset behavior.
 * 
 * React preserves that state across re-renders. Separate uses of the hook
 * manage separate state, so multiple forms can be displayed at once without interfering with each other.
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
 * - resetForm: Restores all fields to the supplied initialValues and
 * always clears errorMessage. Call this after a successful submission or an intentional reset.
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
 * ---- TLDR: ----------------------------------------------------------------------------
 * 1. TValues is our chosen name for a generic type parameter.
 * It represents the shape of this form's values.
 * 
 * 2. "extends object" constrains TValues to an object type because this hook expects
 * a collection of named form fields. It does not specify the field names or enforce
 * flat values. "keyof TValues" identifies the allowed field names  for setFieldValue().
 * 
 * 3. TypeScript infers the fields from the supplied initialValues. For example,
 * { title: "", ratings: 5 } gives us a string title and a numeric rating.
 * 
 * 4. This lets Equipment, User, and Review forms reuse the same hook while retaining their own field names and value types.
 */
export function useFormInput<TValues extends object>(
    initialValues: TValues,
) {
    const [values, setValues] = useState<TValues>(initialValues);
    const [errorMessage, setErrorMessage] = useState<string>("");

    /**
     * Updates one field using its property name while preserving the other fields. 
     * 
     * TKey must be a key in TValues. TValues[TKey] ensures that the new 
     * value matches that particular field's type.
     * 
     * ****IMPORTANT SOURCE*****:
     * keyof TValues restricts field names to keys in our form values.
     * TValues[TKey] looks up the value type for the selected field.
     * https://www.typescriptlang.org/docs/handbook/2/keyof-types.html
     * https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html
     */
    function setFieldValue<TKey extends keyof TValues>(
        field: TKey,
        value: TValues[TKey]
    ): void {
        setValues((currentValues) => ({
            ...currentValues,
            [field]: value,
        }));
    }

    /**
     * Restores all fields to the supplied defaults and clear form-wide feedback.
     * 
     * Call this after a successful submission or an intentional reset.
     * This does not save data or undo an operation already completed thruu a service/repo.
     */
    function resetForm(): void {
        setValues({ ...initialValues });
        setErrorMessage("");
    }

    return {
        values,
        setFieldValue,
        errorMessage,
        setErrorMessage,
        resetForm,
    };
};