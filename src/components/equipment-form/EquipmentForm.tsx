import { useState } from 'react';
import type { SubmitEvent } from 'react';
import type { NewEquipment } from '../../types/equipment';
import { useFormInput } from '../../hooks/useFormInput';

interface EquipmentFormProps {
    // Submits equipment through the parent's asynchronous callback.
    // Resolves after creation succeeds; rejects if creation fails.
    onAddEquipment: (newEquipment: NewEquipment) => Promise<void>;
}

/**
 * Collects details for a new equipment catalogue entry.
 * 
 * Uses useFormInput() to manage all field values, displayed feedback/error messages,
 * and resetting the form after a successful submission. This consolidates reusable
 * presentation logic so other forms can use the same state-management behaviour.
 * 
 * Quantity fields remain strings while being edited so they can be empty. 
 * The submit handler checks and converts them before building the NewEquipment object. 
 * 
 * Existing validation remains in this component *for now* during the hook integration
 * step. Business rules will move to the appropriate service as part of the service refactor.
 * 
 * Valid equipment details are passed through onAddEquipment. This component and 
 * useFormInput do not generate equipment IDs or access a repo.
 * 
 */
export default function EquipmentForm({
    onAddEquipment,
    }: EquipmentFormProps) {
        const {
            values,
            setFieldValue,
            errorMessage,
            setErrorMessage,
            resetForm,
        } = useFormInput({
            name: '',
            category: '',
            description: '',
            quantity: '',
            availableQuantity: '',
            condition: '',
            location: '',
            picture: '',
        });

        const [saving, setSaving] = useState<boolean>(false); // Tracks whether the form is currently submitting.

        // REad the current field values using the same names as before.
        // Just destructuring it to let the existing validation and object construction 
        // stay readable without changing the field names. The values object is still available for other uses.
        const {
            name,
            category,
            description,
            quantity,
            availableQuantity,
            condition,
            location,
            picture
        } = values;


        async function handleSubmit(
            event: SubmitEvent<HTMLFormElement>,
        ): Promise<void> {
            // Prevent the browser from reloading the page on submission.
            event.preventDefault();

            if (saving) {
                return; // Prevent double submission.
            }

            setErrorMessage(''); // Clear any previous error message.
            setSaving(true); // Indicate that the form is currently submitting.

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
                            onChange={(event) => 
                                setFieldValue("name", event.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="equipment-category">Category: </label>
                        <input
                            id="equipment-category"
                            type="text"
                            value={category}
                            onChange={(event) => 
                                setFieldValue("category", event.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="equipment-description">Description: </label>
                        <textarea 
                            id="equipment-description"
                            value={description}
                            onChange={(event) => 
                                setFieldValue("description", event.target.value)}
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
                            onChange={(event) => 
                                setFieldValue("quantity", event.target.value)}
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
                            onChange={(event) => 
                                setFieldValue("availableQuantity", event.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="equipment-condition">Condition: </label>
                        <input
                            id="equipment-condition"
                            type="text"
                            value={condition}
                            onChange={(event) => 
                                setFieldValue("condition", event.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="equipment-location">Location: </label>
                        <input
                            id="equipment-location"
                            type="text"
                            value={location}
                            onChange={(event) => 
                                setFieldValue("location", event.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="equipment-picture">Picture Filename: </label>
                        <input 
                            id="equipment-picture"
                            type="text"
                            value={picture}
                            placeholder="example.jpg"
                            onChange={(event) => 
                                setFieldValue("picture", event.target.value)}
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