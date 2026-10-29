import equipmentData from '../data/equipment.json';
import type { Equipment, NewEquipment } from '../types/equipment';

/**
 * Working equipment collection for the mock repo.
 * 
 * Copy the initial records so repo operations do not modify the imported
 * sample objects directly.
 * 
 * This collection is shared by callers of this module during the current application session.
 * It resets when the application reloads.
 */
let equipment: Equipment[] = equipmentData.map((item) => ({
    ...item,
}));

/**
 * Begin above the highest initial ID.
 * The zero fallback also supports an empty initial collection.
 */
let nextId = 
    Math.max(...equipment.map((item) => item.id), 0) + 1;
