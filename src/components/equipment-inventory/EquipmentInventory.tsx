import type { Equipment } from '../../types/equipment';
import equipmentData from '../../data/equipment.json';

function EquipmentInventory() {
    const equipmentList: Equipment[] = equipmentData;
    
    return(
        <section className="equipment-inventory">
            {/** placeholder for now */}
            ...
        </section>
    );
}