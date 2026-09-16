import type { Equipment } from '../../types/equipment';
import EquipmentItem from '../equipment-item/EquipmentItem';
import equipmentData from '../../data/equipment.json';
import './EquipmentInventory.css';

function EquipmentInventory() {
    const equipmentList: Equipment[] = equipmentData;

    return(
        <section className="equipment-inventory">
            <h2>Equipment Inventory</h2>
            
            { /* Note: Remember the DepartmentSection component from Lab 1.2? We don't have a component similar to it here
            because our Equipment data is currently only one level, no nested entity like Equipment Categories > Equipment Items yet. 
            but we can create a separate component (EquipmentItem) for each equipment item to be rendered. */ }
            {equipmentList.map((equipment) => (
                <EquipmentItem 
                    key={equipment.id}
                    equipment={equipment}
                />
            ))}
        </section>
    );
}

export default EquipmentInventory;