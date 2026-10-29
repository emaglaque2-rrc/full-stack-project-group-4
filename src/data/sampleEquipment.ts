import type { Equipment } from '../types/equipment';

/**
 * Initial test data for the equipment repo.
 * 
 * Each record follows the Equipment interface. These records allow development against
 * a known data shape before a backend is available.
 * 
 * The equipment repo copies this array into its working collection,
 * CRUD operations affect that working col. instead, not this initial test data.
 */
export const sampleEquipment: Equipment[] = [
    {
        "id": 1,
        "name": "Digicamera",
        "category": "Electronics",
        "description": "Trendy high-resolution digital camera for capturing mint photos!!",
        "quantity": 3,
        "availableQuantity": 2,
        "condition": "Good",
        "location": "EDC - P401",
        "picture": "camera.jpg"
    },
    {
        "id": 2,
        "name": "Tripod",
        "category": "Accessories",
        "description": "Stable tripod for stable shots.",
        "quantity": 5,
        "availableQuantity": 5,
        "condition": "Excellent",
        "location": "EDC - P402",
        "picture": "tripod.jpg"
    },
    {
        "id": 3,
        "name": "Microphone",
        "category": "Audio",
        "description": "High-quality microphone for the crispiest audio recording ever.",
        "quantity": 4,
        "availableQuantity": 3,
        "condition": "Good",
        "location": "EDC - P403",
        "picture": "microphone.jpg"
    },
    {
        "id": 4,
        "name": "Lighting Kit",
        "category": "Lighting",
        "description": "Professional lighting kit for perfect illumination.",
        "quantity": 2,
        "availableQuantity": 1,
        "condition": "Fair",
        "location": "EDC - P404",
        "picture": "lighting_kit.jpg"
    },
    {
        "id": 5,
        "name": "Laptop",
        "category": "Computers",
        "description": "High-performance laptop for editing and processing.",
        "quantity": 6,
        "availableQuantity": 6,
        "condition": "Excellent",
        "location": "EDC - P405",
        "picture": "laptop.jpg"
    },
    {
        "id": 6,
        "name": "External Hard Drive",
        "category": "Storage",
        "description": "Portable external hard drive for data backup and transfer.",
        "quantity": 8,
        "availableQuantity": 7,
        "condition": "Good",
        "location": "EDC - P406",
        "picture": "external_hard_drive.jpg"
    },
    {
        "id": 7,
        "name": "Projector",
        "category": "Display",
        "description": "High-definition portable projector for presentations and screenings.",
        "quantity": 3,
        "availableQuantity": 2,
        "condition": "Usable",
        "location": "EDC - P407",
        "picture": "projector.jpg"
    },
    {
        "id": 8,
        "name": "Green Screen",
        "category": "Video",
        "description": "Professional green screen for chroma keying and video production.",
        "quantity": 2,
        "availableQuantity": 1,
        "condition": "Good",
        "location": "EDC - P408",
        "picture": "green_screen.jpg"
    },
    {
        "id": 9,
        "name": "Charger",
        "category": "Accessories",
        "description": "Universal charger for various devices.",
        "quantity": 10,
        "availableQuantity": 10,
        "condition": "Excellent",
        "location": "EDC - P409",
        "picture": "charger.jpg"
    }
];