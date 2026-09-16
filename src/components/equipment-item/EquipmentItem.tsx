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

            <p className="equipment-item__description">
                {equipment.description}
            </p>
            
            <div className="equipment-item__details">
                <p><strong>Quantity:</strong> {equipment.quantity}</p>
                <p><strong>Available:</strong> {equipment.availableQuantity}</p>
                <p><strong>Condition:</strong> {equipment.condition}</p>
                <p><strong>Location:</strong> {equipment.location}</p>
                <p><strong>Category:</strong> {equipment.category}</p>
            </div>
        </article>
    );
}

export default EquipmentItem;