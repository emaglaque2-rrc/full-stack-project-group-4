import { useState } from 'react';
import EquipmentItem from '../equipment-item/EquipmentItem';
import './EquipmentInventory.css';
import * as reviewService from "../../services/reviewService"
import type { EquipmentInventoryProps } from '../../types/equipmentInventoryProps';
import { EquipmentSearch } from '../equipment-search/EquipmentSearch';
import EquipmentForm from '../equipment-form/EquipmentForm';

/**
 * Displays the equipment catalogue, search field, and creation/removal controls.
 * 
 * Receives the equipment collection, loading status, error message, and operatio callbacks from the useEquipment instance owned by App.
 * Using that shared instance keeps the equipment list consistent across pages.
 * 
 * Passes the creation callback to EquipmentForm and connects each EquipmentItem's removal callback to the
 * corresponding equipmentID. These operations go through useEquipment, equipmentService, and equipmentRepository.
 * 
 * Keeps search state and filtering here bceause they determine which records are displayed
 * without changing the stored equipment.
 * 
 * Displays loading feedback and loading/deletion errors from the hook. 
 * EquipmentForm separelty displays its own submission errors.
 * 
 * This component does not validate equipent business rules, generate IDs, or 
 * access the repo directly.
 */
function EquipmentInventory({ 
    equipment,
    loading,
    errorMessage,
    onAddEquipment,
    onRemoveEquipment,
}: EquipmentInventoryProps) {
    const [searchValue, setSearchValue] = useState<string>('');

    const filteredEquipment = searchValue.trim()
        ? equipment.filter((item) => {
            return item.name.toLowerCase().includes(
                searchValue.toLowerCase().trim()
            );
        })
        : equipment;

    const totalReviews = reviewService.getAllReviews().length
    return(
        <section className="equipment-inventory">
            <h2>Equipment Inventory</h2>
            <p id='reviewCounter'>{totalReviews} Reviews From our Community!</p>

            {errorMessage && (
                <p role="alert" className="error-message">
                    {errorMessage}
                </p>
            )}

            {loading ? (
                <p role="status">Loading equipment...</p>
            ) : (
                <>

                    <EquipmentForm
                        onAddEquipment={onAddEquipment}
                    />

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
                                onRemove={() => {
                                    void onRemoveEquipment(equipment.id);
                                }}
                            />
                        ))}
                    </div>
                    )}
                </>
            )}
        </section>
    );
};

export default EquipmentInventory;