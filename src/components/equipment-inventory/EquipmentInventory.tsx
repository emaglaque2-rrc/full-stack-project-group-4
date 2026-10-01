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

    // Remove a catalogue entry from the equipment inventory. This function
    // is passed down to the EquipmentItem component as a prop, so that the
    // EquipmentItem component can call this function when the user clicks
    // the "Remove" button for a specific equipment item.
    // It uses the unique id of the equipment item.
    function handleRemoveEquipment(equipmentId: number) {
            // The shared props interface (equipmentProps) makes setEquipment optional.
            // Stop here if this component wasn't given a setter.
            if (!setEquipment) {
                console.error('setEquipment function is not provided');
                return;
            }
            
            // Calculate the updated catalogue from the previous state.
            // React supplies that state as currentEquipment, which is an array of Equipment objects.
            setEquipment((currentEquipment) => {

                // Create a new array containing every item except
                // the one whose ID matches equipmentId.
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