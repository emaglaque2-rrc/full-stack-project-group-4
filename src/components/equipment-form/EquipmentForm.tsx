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
        // Quantity and availableQuantity: keep the raw input as text so the field can also be empty.
        // Convert it to a number after validation when submitting.
        const [quantity, setQuantity] = useState<string>('');
        const [availableQuantity, setAvailableQuantity] = useState<string>('');
        const [condition, setCondition] = useState<string>('');
        const [location, setLocation] = useState<string>('');
        const [picture, setPicture] = useState<string>('');

        return (
            <section className="equipment-form">
                <h3>Add New Equipment</h3>

                {/*Prevent page reloads while we build submit handler. */}
                <form onSubmit={(event) => event.preventDefault()}>
                    {/* Each input displays its state value and updates it on change. */}
                    <div>
                        <label htmlFor="equipment-name">Equipment Name:</label>
                        <input 
                            id="equipment-name"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>

                </form>
            </section>
        )
    }