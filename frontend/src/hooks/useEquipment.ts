import { useEffect, useState } from 'react';
import { equipmentService } from '../services/equipmentService';
import type { Equipment, NewEquipment } from '../types/equipment';

/**
 * Manages the equipment collection displayed by React.
 * 
 * Loads equipment when the hook mounts and updates its local list
 * after successful service operations.
 * 
 * Business validation belongs to equipmentService.
 * Data access belongs to equipmentRepository.
 * 
 * Each invocation owns separate React state. This will be invoked in App 
 * and passed down to child components that need the same equipment data and operations.
 * 
 * @returns
 * - equipment: Equipment records currently displayed.
 * - loading: Whether the initial equipment request is pending.
 * - errorMessage: Feedback for loading or deletion failures.
 * - addEquipment: Creates equipment and updates the displayed list. Rejects
 * on failure so the form can display its submission error(ss).
 * - removeEquipment: Deletes equipment and updates the displayed list. 
 * Returns whether deletion succeeded.
 */
export function useEquipment() {
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');

    /**
     * Loads the initial equipment collection when this hook instance mounts.
     * 
     * Uses a cleanup flag to ignore a request's result after its effect has been cleaned up. 
     * This prevents that request from updating state.
     * The flag does not cancel the request itself.
     */
    useEffect(() => {
        let ignore = false;

        /**
         * Requests equipment through the service and stores it in React state.
         * 
         * Displays a message if loading fails and ends the loading state after the request finishes, provided
         * the effect is still active.
         * 
         * @returns A Promise that resolves after loading has been handled.
         */
        async function loadEquipment(): Promise<void> {
            try {
                const records = await equipmentService.getEquipment();

                if (!ignore) {
                    setEquipment(records);
                }
            } catch (error) {
                if (!ignore) {
                    setErrorMessage(
                        error instanceof Error 
                        ? error.message
                        : "Unable to load equipment."
                    );
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        }

        void loadEquipment();

        return () => {
            ignore = true;
        };
    }, []);

    /**
     * Creates equipment throuhg the service and adds the returned record to the collection displayed by React.
     * 
     * The service normalizes and validates the input. The repo stores the record and assigns its ID. React state is updated only after
     * that operation succeeds.
     * 
     * Uses a functional state update to append the created record to the latest equipment list.
     * 
     * Errors intentionally propagate to EquipmentForm throught he callback.
     * The form displays submission feedback and preserves its entered values when creation fails.
     * 
     * @param input - Equipment details without an ID. Quantity fields must already be
     * numbers; business validation is performed by the service.
     * @returns A Promise that resolves after successful creation and scheduling the React
     * state update, or rejects if the service operation fails.
     */
    async function addEquipment(input: NewEquipment): Promise<void> {
        const createdEquipment = 
            await equipmentService.addEquipment(input);

        setEquipment((currentEquipment) => [
            ...currentEquipment,
            createdEquipment,
        ]);
    }

    /**
     * Removes equipment through the service and updates the displayed list.
     * 
     * Clears previous hook feedback before requesting deletion.
     * The service validates the ID and asks the repo to delete the record.
     * 
     * After successful deletion, uses a functional state update to remove the
     * matching record from the latest React equipment list.
     * 
     * if deletion fails, keeps the displayed collection unchanged and sets errorMessage
     * so EquipmentInventory can display the failure.
     * 
     * @param id- ID of the equipment record to remove.
     * @returns A Promise resolving to true when deletion succeeds,
     * or false when an error is caught.
     */
    async function removeEquipment(id: number): Promise<boolean> {
        setErrorMessage('');

        try {
            await equipmentService.removeEquipment(id);

            setEquipment((currentEquipment) =>
                currentEquipment.filter((item) => item.id !== id)
            );
            return true;
        } catch (error) {
            setErrorMessage(
                error instanceof Error
                ? error.message
                : "Unable to remove equipment."
            );

            return false;
        }
    }

    return {
        equipment,
        loading,
        errorMessage,
        addEquipment,
        removeEquipment,
    };
}