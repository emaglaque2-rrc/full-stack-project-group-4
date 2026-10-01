import type { NewEquipment } from '../../types/equipment';

interface EquipmentFormProps {
    // Callback supplied by the parent to receive valid equipment details.
    onAddEquipment: (newEquipment: NewEquipment) => void;
}

// Collects and validates details for a new catalogue entry.
// The parent handles adding that entry to the shared equipment state.
export default function EquipmentForm({
    onAddEquipment,
    }: EquipmentFormProps) {
        return (
            <section>
                <h2>Add New Equipment</h2>
            </section>
        )
    }