import type { NewEquipment } from '../../types/equipment';

interface EquipmentFormProps {
    onAddEquipment: (newEquipment: NewEquipment) => void;
}