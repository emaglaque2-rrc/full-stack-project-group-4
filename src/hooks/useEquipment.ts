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

    useEffect(() => {
        let ignore = false;

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

    async function addEquipment(input: NewEquipment): Promise<void> {
        const createdEquipment = 
            await equipmentService.addEquipment(input);

        setEquipment((currentEquipment) => [
            ...currentEquipment,
            createdEquipment,
        ]);
    }

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