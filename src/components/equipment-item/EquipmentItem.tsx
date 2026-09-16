import type { Equipment } from '../../types/equipment';

interface EquipmentItemProps {
    equipment: Equipment;
}

function EquipmentItem({ equipment }: EquipmentItemProps) {
    return (
        <article className="equipment-item">
            { /* Note: The images are in the public directory because they are static assets,
            and so I don't need to import them in the component. */ }
            <img
                src={`/images/equipment-images/${equipment.picture}`}
                alt={`Image of ${equipment.name}`}
            />
            <h3>{equipment.name}</h3>
            <p>{equipment.description}</p>
            <p>Quantity: {equipment.quantity}</p>
            <p>Available: {equipment.availableQuantity}</p>
            <p>Condition: {equipment.condition}</p>
            <p>Location: {equipment.location}</p>
            <p>Category: {equipment.category}</p>
        </article>
    );
}

export default EquipmentItem;