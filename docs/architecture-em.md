# Architectural Layout for Red River Rentals: Equipment System
Author: Edraque Maglaque
Sprint: 3

## Hook - useFormInput.ts

### What does it do?

`useFormInput` manages a form's field values, displayed error messages, and reset behaviour. It returns `values`, `setFieldValue`, `errorMessage`, `setErrorMessage`, and `resetForm`.

The hook uses a generic type so it can work with different forms without requiring them to have the same fields. For example, EquipmentForm
has quantity and condition fields, while a review form would have different values.

### Separation of concerns and logic decisions

I extracted this logic because updating fields, displaying feedback, and resetting inputs are behaviours that multiple forms need. Keeping them in one hook avoids repeating the same state-management code in each component

The hook doesnt check equipment rules or save records. It only manages presentation state. The component decides when to display an error
or reset its feilds, while the service decides whether the submitted equipment is valid.

Each call crreates independent state. Reusing the hook in another form does not cause that form to share its entered values or error message
with EquipmentForm.

### Where and how is it used?

`EquipmentForm` uses the hook to manage its controlled inputs. Each input reads from `values` and calls `setFieldValue` when edited.
When submission fails, the form uses `setErrorMessage` to display the rror and keeps the entered values. After a successful submission, it calls `resetForm` to restore the defaults and clear feedback. This lets the user correct a failed submission without entering everything again.

## Hook - useEquipment.ts

### What does it do? 

`useEquipment` loads equipment through the service and manages the collection displayed by React. It also provides loading
state, an error message, and functions for adding and removing equipment.

Its effect loads the initial records. The effect's cleanup flag prevents an outadated request from updating state after
cleanup; it does not cancel the request itself.

### Separation of concerns and logic decisions

I moved equipment state management into this hook so App would not need to contain the loading
and update logic. The hook handles what React needs to display, while the service handles equipment rules and of course, the repo handles storage.

The displayed collection changes only after a service operation succeeds. Adding equipment appends the returned record, and removing equipment filters out the deleted ID. Both use functional state updates to work from the latest list.

Creation errors are passed back to EquipmentForm because that component displays submission feedback.
Loading and deletion errors are caught in the hook and displayed by EquipmentInventory/

### Where and how is it used? 

`App` calls `useEquipment` once and passes its equipment collection and callbacks to EquipmentInventory. The inventory passes the add callback to EquipmentForm and connects each equipment card's removal button to its ID.

App also passes the same equipment collection to the User and Review pages for their equipment selections. using one hook instance keeps those pages connected to the same React state. Calling the hook separately in each page would create separate lists that would not automatically
stay synchronized.

## Service - equipmentService.ts

### What does it do? 

`equipmentService` provides equipment retrieval, creation, updating, and removal. Before creating or updating records, it trims text and validates the details. 

Validation checks required text fields, letters and whitespace in category/condition, nonnegative whole-number quantities, and available quantity not exceeding total quantity. IDs must be positive whole numbers.

Missing required text fields stop validation immmediately. Otherwise, applicable errors are collected into one message.

### Separation of concerns and logic decisions

I moved validation from EquipmentForm into the service so creation, updates, and other components
can use the same rules.

THe form converts quantity strings into numbers, while the service checks whether those numbers are valid. Blank
quantities become NaN and fail the integer check. 

The service throws errors when validation fails and delegates storage to the repo. It doesnt manage React state or directly modify the collection.

### Where and how is it used? `useEquipment` calls `getEqupment` when loading, `addEquipment` on submmission, and `removeEquipment` when removal is requested..

`getEquipmentById` and `updateEquipment` are implemented but not connected to a detail or editing interface yet. Updating reuses the
same normalization and validation as creation.

## Repository - equipmentRepository.ts

### What does it do? 

`equipmentRepositroy` manages equipment through `getAll`, `getbyId`, `create`, `update`, and `delete`.

It copies ten typed records from `sampleEquipment.ts` into an in-memory collection. New IDs start above the highest initial ID, and deleting recrods does not reset the counter. 

### Separation of concerns and logic decisions

I kept initialization, lookups, record changes, and ID allocation here because they concern data storage and access. Validation belongs in the service while React state belongs in the hooks.

Initial and returned records are copied to prevent calers from directly modifying stored objects. Shallow copies work because Equipment currently contains only primitive fields.

Methods return Promises to prep callers for future backend requests. Currently, no HTTP requests are made,
and data reesets when the app reloads.

### Where and how is it used?

`equipmentService` calls the repo. Equipment components and hooks do not access it or the sample data directly.

Records follow the Equipment interface. Creation and update inputs use newEquipment, which excludes the ID. The repo
assigns IDs during creation and preserves them during updates.

The UI currently uses retrival, creation, and deletion. Single-record retrieval and updating will be for nextt sprint.

## Example: Adding Equipment

1. EquipmentForm reads useFormInput values and convertss quantity strings to numbers.
2. It awaits the add callback passed through App and EquipmentInventory to useEquipment.
3. The hook calls equipmentService to normalize and validate the details.
4. The service calls equipmentRepository to store the record and assign an ID.
5. The hook updates React state, sharing the updated collection across pages.
6. The form resets on success or displays an error and preserves inputs on failure.
