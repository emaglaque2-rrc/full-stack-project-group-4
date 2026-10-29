# Architecture Layout Document

This document explains the user design. It describes the specific uses of hooks, services, and repositories that I have written for the User feature. 

## Custom Hook

- The file created for this is the useUser.ts
- This hook file manages the user data. It stores the list of users in React state and provides the functions for loading users, creating new user, updating existing user information, and removing a specific rental from the user's list.
- It also manages the loading state and error messages.
- I included this here because it connects the React components to the service without requiring each component to manage the data operation itself, also reducing repeated code and keeps the component focused on displaying the information and handling user interactions.
- Before the user-related operations were handled directly inside the UI components.
- The hook file is called in App.tsx. The functions returned by the hook are passed to user-page.tsx, which passes the relevant props to user-form.tsx and user-inventory.tsx
- The service methods called by the hook:
  - userService.getUsers() to load users
  - userService.createUser() to create a new user
  - userService.updateUser() to update existing user information
  - userService.deleteRental() to remove a rental from user's rental list

## Service

- The file created for this is userService.tsx
- This user service file handles business logic rules for operations. It checks whether an email address is already registered before creating a a new user. It also provides methods to retrieve users, create users, update users, and remove rentals.
- The logic included here is that, before in the business logic was mixed into the component code, now it is organized in a service file making it easier to maintain and keep the repository focused on managing data.
- The service file is imported into useUser.ts hook file. The hook calls the service methods and the service call the corresponding repository methods in the userRepo.ts file.
- The Operations in the service files:
  - getUsers() calls userRepository.getUsers().
  - createUser() checks for duplicate email and then call userRepository.createUser().
  - updateUser() calls userRepository.updateUser().
  - deleteRental() calls userRepository.deleteRental()

## Repository:

- The file created for this is the userRepository.tsx
- This file manages the user data CRUD operations. That is create, retrieve, and update users, and remove rental. The data is imported from the user-info.json file.
- The logic included here is tha the repository contains data operations as they should be separated from the business rules and React state management.
- The repository is imported into the userService.tsx. 
- The operations included in the repo:
  - getusers(): returns the list of users
  - getUserById(): get user by the id
  - createUser(): creates a new user
  - updateUser(): updates the existing user's information
  - deleteRental(): removes a rental from the user's rental list
  
## Shared Form Hook: useFormInput

- The file that was created for this is useFormInput and it was done bu Edraque
- The file manages the form value,individual field updates, error messages, and resetting form values. 
- The logic included is that instead of handling each form's state separately, the shared hooks allows the common form functionality to be reused.
- The hook is used in the user-form.tsx to manage the form for adding a user and their initial rental. Also used in the user-inventory.tsx to manage the form  for editing an existing user and adding another rental.



