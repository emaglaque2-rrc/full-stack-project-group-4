import { useEffect, useState } from 'react';
import { equipmentService } from '../services/equipmentService';
import type { Equipment, NewEquipment } from '../types/equipment';

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
}