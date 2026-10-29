import type { Equipment, NewEquipment } from "./equipment";

/**
 * Equipment data and operations required by the inventory page.
 * 
 * App supplies these from one useEquipment instance so routed pages receive the
 * same equipment collection.
 */
export interface EquipmentInventoryProps {
    equipment: Equipment[];
    loading: boolean;
    errorMessage: string;
    onAddEquipment: (input: NewEquipment) => Promise<void>;
    onRemoveEquipment: (id: number) => Promise<boolean>;
}