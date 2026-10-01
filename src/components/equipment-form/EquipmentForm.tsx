import type { NewEquipment } from '../../types/equipment';

// The parent supplies the action to perform when valid equipment data is submitted.
interface EquipmentFormProps {
    onAddEquipment: (newEquipment: NewEquipment) => void;
}

export default function EquipmentForm({
    onAddEquipment,
    }: EquipmentFormProps) {
        return (
            <section>
                <h2>Add New Equipment</h2>
            </section>
        )
    }