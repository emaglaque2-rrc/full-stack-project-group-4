import { useState, type SubmitEvent } from 'react';
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

        // Store validation feedback to display in the form.
        // This is a single string for simplicity, but could be an array of strings if we wanted to display multiple errors.
        const [errorMessage, setErrorMessage] = useState<string>('');

        function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
            // Prevent the browser from reloading the page on submission.
            event.preventDefault();

            setErrorMessage(''); // Clear any previous error message.

            if (
                !name.trim() ||
                !category.trim() ||
                !description.trim() ||
                !quantity.trim() ||
                !availableQuantity.trim() ||
                !condition.trim() ||
                !location.trim() ||
                !picture.trim()
            ) {
                setErrorMessage('Please complete all equipment fields.');
                return;
            }

        }

        return (
            <section className="equipment-form">
                <h3>Add New Equipment</h3>

                {/*Prevent page reloads while we build submit handler.
                Also will be handling validation ourselves when the form is submitted. */}
                <form noValidate onSubmit={(event) => event.preventDefault()}>
                    {/* Each input displays its state value and updates it on change. */}
                    <div>
                        <label htmlFor="equipment-name">Equipment Name: </label>
                        <input 
                            id="equipment-name"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="equipment-category">Category: </label>
                        <input
                            id="equipment-category"
                            type="text"
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="equipment-description">Description: </label>
                        <textarea 
                            id="equipment-description"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </div>

                    {/* Quantities must be whole numbers that are zero or greater. */}
                    <div>
                        <label htmlFor="equipment-quantity">Total Quantity: </label>
                        <input 
                            id="equipment-quantity"
                            type="number"
                            value={quantity}
                            min="0"
                            step="1"
                            onChange={(event) => setQuantity(event.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="equipment-available">Available Quantity: </label>
                        <input 
                            id="equipment-available"
                            type="number"
                            value={availableQuantity}
                            min="0"
                            step="1"
                            onChange={(event) => setAvailableQuantity(event.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="equipment-condition">Condition: </label>
                        <input
                            id="equipment-condition"
                            type="text"
                            value={condition}
                            onChange={(event) => setCondition(event.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="equipment-location">Location: </label>
                        <input
                            id="equipment-location"
                            type="text"
                            value={location}
                            onChange={(event) => setLocation(event.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="equipment-picture">Picture Filename: </label>
                        <input 
                            id="equipment-picture"
                            type="text"
                            value={picture}
                            placeholder="example.jpg"
                            onChange={(event) => setPicture(event.target.value)}
                        />
                    </div>

                </form>
            </section>
        )
    }