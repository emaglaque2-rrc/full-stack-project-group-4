import { equipmentRepository } from '../repositories/equipmentRepository';
import type { Equipment, NewEquipment } from '../types/equipment';

/**
 * Removes surrounding whitespace from equipment text fields.
 * 
 * Returns a nnew object so the caller's input is not modified.
 * Both creation and updates use this same normalization.
 */
function normalizeEquipment(input: NewEquipment): NewEquipment {
    return {
        ...input,
        name: input.name.trim(),
        category: input.category.trim(),
        description: input.description.trim(),
        condition: input.condition.trim(),
        location: input.location.trim(),
        picture: input.picture.trim(),
    };
}

function validateEquipment(input: NewEquipment): void {
    const errors: string[] = [];

    const { name, category, description, quantity, availableQuantity, condition, location, picture } = input;

    if (
        !name.trim() ||
        !category.trim() ||
        !description.trim() ||
        !quantity.trim() ||
        !availableQuantity.trim() ||
        !condition.trim() ||
        !location.trim() ||
        !picture.trim()
    ) {
        errors.push('Please complete all equipment fields.');
        return;
    }    
    
    // Allow only letters and whitespace in category and condition, reject numbers and punctuation.
    // The earlier empty-field check already rejects whitespace-only values.
    // Already worked with regex in previous terms, but resource is here:
    // https://www.w3schools.com/jsref/jsref_regexp_test.asp
    // **IMPORTANT** I used AI to help me construct the regex, but I verified it and tested it myself.
    const lettersAndSpacesRegex = /^[A-Za-z\s]+$/;

    if (!lettersAndSpacesRegex.test(category.trim())) {
        errors.push('Category must contain only letters and spaces.');
        return;
    }


    if (!lettersAndSpacesRegex.test(condition.trim())) {
        errors.push('Condition must contain only letters and spaces.');
        return;
    }

}