import type { EquipmentSearchProps } from '../../types/equipmentSearchProps';

export function EquipmentSearch({
    searchValue,
    handleSearchChange
}: EquipmentSearchProps) {
    return(
        <form onSubmit={(event) => event.preventDefault()}>

            <label htmlFor="equipment-search">
                Search Equipment by name: 
            </label>

            <input 
                id="equipment-search"
                type="text"
                name="field-equipment" 
                placeholder="Enter an equipment name..."
                value={searchValue}
                onChange={(event) => 
                    handleSearchChange(event.target.value)
                }
            />

        </form>
    )
}