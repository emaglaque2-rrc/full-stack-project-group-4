// As for id property, I didn't name it equipmentId because when another data structure
// needs to reference this equipment, it will be referenced as equipment.id, not equipment.equipmentId. 
// So I think it's better to just name it id.
//
// Then for quantity and availableQuantity, I think it's better to have both instead of a 'status' property, because
// we won't know the total number of equipment items, how many items are currently available for use, 
// and we won't know how many items are currently in use.
export interface Equipment {
    id: number;
    name: string;
    category: string;
    description: string;
    quantity: number;
    availableQuantity: number;
    condition: string;
    location: string;
    picture: string;
}