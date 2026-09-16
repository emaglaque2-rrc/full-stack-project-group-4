import type { Equipment } from '../../types/equipment';
import equipmentData from '../../data/equipment.json';

function EquipmentInventory() {
    const equipmentList: Equipment[] = equipmentData;

    return(
        <section className="equipment-inventory">
            <h2>Equipment Inventory</h2>
            
            {equipmentList.map((equipment) => (
                <article key={equipment.id}>
                    <h3>{equipment.name}</h3>

                </article>
            ))}
        </section>
    );
}