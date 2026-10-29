import equipmentData from '../data/equipment.json';
import type { Equipment, NewEquipment } from '../types/equipment';

let equipment: Equipment[] = equipmentData.map((item) => ({
    ...item,
}));