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

            // Allow only letters and whitespace in category and condition, reject numbers and punctuation.
            // The earlier empty-field check already rejects whitespace-only values.
            // Already worked with regex in previous terms, but resource is here:
            // https://www.w3schools.com/jsref/jsref_regexp_test.asp
            // **IMPORTANT** I used AI to help me construct the regex, but I verified it and tested it myself.
            const lettersAndSpacesRegex = /^[A-Za-z\s]+$/;

            if (!lettersAndSpacesRegex.test(category.trim())) {
                setErrorMessage('Category must contain only letters and spaces.');
                return;
            }


            if (!lettersAndSpacesRegex.test(condition.trim())) {
                setErrorMessage('Condition must contain only letters and spaces.');
                return;
            }

            // Convert the input strings into numbres for the equipment object.
            const quantityNumber = Number(quantity);
            const availableQuantityNumber = Number(availableQuantity);

            if (
                !Number.isInteger(quantityNumber) ||
                !Number.isInteger(availableQuantityNumber) ||
                quantityNumber < 0 ||
                availableQuantityNumber < 0
            ) {
                setErrorMessage('Quantities must be whole numbers that are zero or greater.');
                return;
            }

            if (availableQuantityNumber > quantityNumber) {
                setErrorMessage('Available quantity cannot exceed total quantity.');
                return;
            }

            // Prepare the validated equipment details.
            // The parent will generate the ID when adding the catalogue entry, so we don't include it here.
            const newEquipment: NewEquipment = {
                name: name.trim(),
                category: category.trim(),
                description: description.trim(),
                quantity: quantityNumber,
                availableQuantity: availableQuantityNumber,
                condition: condition.trim(),
                location: location.trim(),
                picture: picture.trim(),
            };

            // Send the equipment details to the callback provided by the parent.
            onAddEquipment(newEquipment);

            // Reset the form fields after passing the valid equipment to the parent.
            setName('');
            setCategory('');
            setDescription('');
            setQuantity('');
            setAvailableQuantity('');
            setCondition('');
            setLocation('');
            setPicture('');

        }

        return (
            <section className="equipment-form">
                <h3>Add New Equipment</h3>

                {/* Handle submission and validation through our custom submit handler */}
                <form noValidate onSubmit={handleSubmit}>
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

                    {/* show the message only when validation has set an error. */}
                    {errorMessage && (
                        <p role="alert" className="error-message">
                            {errorMessage}
                        </p>
                    )}

                    <button type="submit">
                        Add Equipment
                    </button>

                </form>
            </section>
        )
    }