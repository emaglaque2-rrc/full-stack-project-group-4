import type { Equipment } from '../../types/equipment';
import equipmentData from '../../data/equipment.json';

function EquipmentInventory() {
    const equipmentList: Equipment[] = equipmentData;

    return(
        <section className="equipment-inventory">
            <h2>Equipment Inventory</h2>
            
            { /* Remember the DepartmentSection component from Lab 1.2? We don't have a component similar to it here
            because our Equipment data is currently only one level, no nested entity like Equipment Categories > Equipment Items yet. 
            but we can create a separate component for each equipment item to be rendered. */ }
            {equipmentList.map((equipment) => (
                <article key={equipment.id}>
                    <h3>{equipment.name}</h3>
                </article>
            ))}
        </section>
    );
}

export default EquipmentInventory;