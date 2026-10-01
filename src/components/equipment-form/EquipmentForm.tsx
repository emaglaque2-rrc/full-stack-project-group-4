import { useState } from 'react';
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
        const [name, setName] = useState<string>('');
        const [category, setCategory] = useState<string>('');
        const [description, setDescription] = useState<string>('');
        // Quantity: keep the raw input as text so the field can also be empty.
        // Convert it to a number after validation when submitting.
        const [quantity, setQuantity] = useState<string>('0');
        const [availableQuantity, setAvailableQuantity] = useState<string>(0);
        const [condition, setCondition] = useState<string>('');
        const [location, setLocation] = useState<string>('');
        const [picture, setPicture] = useState<string>('');

        return (
            <section>
                <h2>Add New Equipment</h2>
            </section>
        )
    }