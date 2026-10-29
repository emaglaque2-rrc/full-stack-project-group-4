import { equipmentRepository } from '../repositories/equipmentRepository';
import type { Equipment, NewEquipment } from '../types/equipment';

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
}