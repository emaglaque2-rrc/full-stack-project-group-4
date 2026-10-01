import type { Equipment } from "./equipment";

export interface equipmentProps {
    equipment: Equipment[]
    setEquipment?: React.Dispatch<React.SetStateAction<Equipment[]>>

    // Supplied to pages that need to allocate IDs for new equipment entries.
    // This is optional because not all pages need to allocate IDs.
    getNextEquipmentId?: () => number 
}