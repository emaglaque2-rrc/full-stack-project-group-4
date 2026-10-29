import { sampleEquipment } from '../data/sampleEquipment';
import type { Equipment, NewEquipment } from '../types/equipment';

/**
 * Provides data access for equipment records using an in-memory collection.
 * 
 * The service layer calls these methods and handles business validation.
 * THis repository does not manage React state or display error messages.
 * 
 * Copy the initial records so repo operations do not modify the imported
 * sample objects directly.
 * 
 * Methods return Promises to follow the Monsters repo pattern and
 * prepare callers for future asynchronous backend requests.
 * This implementation does not currently make HTTP requests.
 * 
 * Returned records are shallow copies. This is sufficient for the current
 * Equipment type because its fields contain only primitive values.
 */
let equipment: Equipment[] = sampleEquipment.map((item) => ({
    ...item,
}));

/**
 * Begin above the highest initial ID.
 * The zero fallback also supports an empty initial collection.
 */
let nextId = 
    Math.max(...equipment.map((item) => item.id), 0) + 1;

export const equipmentRepository = {
    /**
     * Reads all equipment records.
     * Returns a new array containing copies of the stored value.
     */
    async getAll(): Promise<Equipment[]> {
        return equipment.map((item) => ({
            ...item,
        }));
    },

    /**
     * REads one equipment record by ID.
     * Returns a copy when found, or null when the ID does not exist.
     */
    async getById(id: number): Promise<Equipment | null> {
        const item = equipment.find(
            (item) => item.id === id);
        return item ? { ...item } : null;
    },

    /**
     * Creates an equipment record and assigns its ID.
     * Expects business validation to have been completed by the service.
     */
    async create(input: NewEquipment): Promise<Equipment> {
        const item: Equipment = {
            ...input,
            id: nextId++,
        };
        
        equipment = [...equipment, item];

        return { ...item };
    },

    /**
     * Updates an existing equipment record.
     * 
     * Replaced all editable fields of an existing equipment record. 
     * The record keeps its existing ID.
     * 
     * This is a full update: input must contain every NewEquipment field.
     * Returns the new updated record, or null when the ID does not exist.
     */
    async update(
        id: number,
        input: NewEquipment,
    ): Promise<Equipment | null> {
        const index = equipment.findIndex((item) => item.id === id);

        if (index === -1) {
            return null;
        }

        const updatedItem: Equipment = {
            ...input,
            id: equipment[index].id,
        };

        equipment = equipment.map((item) => 
            item.id === id ? updatedItem : item
        );

        return { ...updatedItem };
    }, 

    /**
     * Deletes an equipment recorded by ID.
     * Returns true if a record was removed, or false if none matched.
     * Removing a record does not reset the ID counter.
     */
    async delete(id: number): Promise<boolean> {
        const originalLength = equipment.length;

        equipment = equipment.filter((item) => item.id !== id);

        return equipment.length < originalLength;
    },
};