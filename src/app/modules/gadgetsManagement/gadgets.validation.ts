import { z } from "zod";



const gadgetsAddValidationScheam = z.object({
    body: z.object({
        name: z.string(),
        price: z.number().min(0, { message: "Price must be a positive number" }),
        quantity: z.number(),
        releaseDate: z.string(),
        brand: z.string().min(1, { message: "Brand is required" }),
        modelNumber: z.string().min(1, { message: "Model number is required" }).regex(/^[A-Za-z0-9-]+$/, { message: "Model number must be alphanumeric" }),
        category: z.enum(['Smartphones', 'Laptops', 'Cameras', 'Tablets', 'Wearables', 'Others']),
        operatingSystem: z.enum(['iOS', 'Android', 'Windows', 'MacOS', 'Linux', 'Others']).optional(),
        connectivity: z.array(z.enum(['Bluetooth', 'Wi-Fi', 'USB-C', 'NFC', '5G', 'Others'])).optional(),
        powerSource: z.enum(['Battery-Powered', 'Plug-in', 'Solar', 'Others']).optional(),
        features: z.object({
            cameraResolution: z.enum(['Up to 12MP', '12MP - 24MP', '24MP - 48MP', '48MP+']).optional(),
            storageCapacity: z.enum(['Up to 128GB', '128GB - 256GB', '256GB - 512GB', '512GB+']).optional(),
            screenSize: z.enum(['Up to 5 inches', '5 - 6 inches', '6 - 7 inches', '7 inches+']).optional(),
        }).optional(),
        additionalAttributes: z.object({
            weight: z.number().nonnegative().optional(),
            dimensions: z.object({
                length: z.number().nonnegative().optional(),
                width: z.number().nonnegative().optional(),
                height: z.number().nonnegative().optional(),
            }).optional(),
            compatibility: z.array(z.string()).optional(),
        }).optional(),
    })
})

const gadgetUpdateValdation = z.object({
    body: z.object({
        price: z.number().min(0, { message: "Price must be a positive number" }),
        quantity: z.number(),
    })
})

export const gadgetsValidations = {
    gadgetsAddValidationScheam,
    gadgetUpdateValdation
}