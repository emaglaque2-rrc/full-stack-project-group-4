import { useState } from 'react';

/**
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
 * 
 */
export function useFormInput<TValues extends object>(
    initialValues: TValues,
) {

};