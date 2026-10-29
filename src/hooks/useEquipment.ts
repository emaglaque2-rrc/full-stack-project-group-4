import { useEffect, useState } from 'react';
import { equipmentService } from '../services/equipmentService';
import type { Equipment, NewEquipment } from '../types/equipment';

export function useEquipment() {
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');
}