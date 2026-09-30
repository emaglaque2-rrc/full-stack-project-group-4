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


        </form>
    )
}