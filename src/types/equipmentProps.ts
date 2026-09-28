import type { Equipment } from "./equipment";

export interface equipmentProps {
    equipment: Equipment[]
    setEquipment?: React.Dispatch<React.SetStateAction<Equipment[]>>
}