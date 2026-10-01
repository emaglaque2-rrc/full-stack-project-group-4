import { useState } from 'react';
import EquipmentItem from '../equipment-item/EquipmentItem';
import './EquipmentInventory.css';
import type { equipmentProps } from '../../types/equipmentProps';
import { EquipmentSearch } from '../equipment-search/EquipmentSearch';

function EquipmentInventory({ 
    equipment, setEquipment 
    }: equipmentProps) {

    const [searchValue, setSearchValue] = useState<string>('');

    const filteredEquipment = searchValue.trim()
        ? equipment.filter((item) => {
            return item.name.toLowerCase().includes(
                searchValue.toLowerCase().trim()
            );
        })
        : equipment;

        function handleRemoveEquipment(equipmentId: number) {
            if (!setEquipment) {
                console.error('setEquipment function is not provided');
                return;
            }

            setEquipment((currentEquipment) => {
                return currentEquipment.filter((item) => {
                    return item.id !== equipmentId;
                })
            })
        }

    return(
        <section className="equipment-inventory">
            <h2>Equipment Inventory</h2>

            <EquipmentSearch
                searchValue={searchValue}
                handleSearchChange={setSearchValue}
            />
            
            { /* Note: Remember the DepartmentSection component from Lab 1.2? We don't have a component similar to it here
            because our Equipment data is currently only one level, no nested entity like Equipment Categories > Equipment Items yet. 
            but we can create a separate component (EquipmentItem) for each equipment item to be rendered. */ }
                
            {filteredEquipment.length === 0 ? (
                <p> No equipment found.</p>
            ) : (
            <div className="equipment-inventory__grid"> 
                {filteredEquipment.map((equipment) => (
                    <EquipmentItem 
                        key={equipment.id}
                        equipment={equipment}
                    />
                ))}
            </div>
            )}
            
        </section>
    );
};

export default EquipmentInventory;