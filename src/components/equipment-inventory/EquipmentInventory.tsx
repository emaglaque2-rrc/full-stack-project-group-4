import EquipmentItem from '../equipment-item/EquipmentItem';
import './EquipmentInventory.css';
import type { equipmentProps } from '../../types/equipmentProps';
import { EquipmentSearch } from '../equipment-search/EquipmentSearch';

function EquipmentInventory({ equipment }: equipmentProps) {

    return(
        <section className="equipment-inventory">
            <h2>Equipment Inventory</h2>
            
            { /* Note: Remember the DepartmentSection component from Lab 1.2? We don't have a component similar to it here
            because our Equipment data is currently only one level, no nested entity like Equipment Categories > Equipment Items yet. 
            but we can create a separate component (EquipmentItem) for each equipment item to be rendered. */ }
            <div className="equipment-inventory__grid"> 
                {equipment.map((equipment) => (
                    <EquipmentItem 
                        key={equipment.id}
                        equipment={equipment}
                    />
                ))}
            </div>
                
        </section>
    );
}

export default EquipmentInventory;