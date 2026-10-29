import type { Equipment, NewEquipment } from "./equipment";

export interface EquipmentInventoryProps {
    equipment: Equipment[];
    loading: boolean;
    errorMessage: string;
    onAddEquipment: (input: NewEquipment) => Promise<void>;
    onRemoveEquipment: (id: number) => Promise<boolean>;
}