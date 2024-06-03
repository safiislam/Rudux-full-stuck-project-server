import { Schema, model } from "mongoose";
import { TGadest } from "./gadgest.interface";



const gadgetsSchema = new Schema<TGadest>(
    {
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        releaseDate: {
            type: Date,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        modelNumber: {
            type: String,
            required: true,
            unique: true
        },
        category: {
            type: String,
            enum: ['Smartphones', 'Laptops', 'Cameras', 'Tablets', 'Wearables', 'Others'],
            required: true
        },
        operatingSystem: {
            type: String,
            enum: ['iOS', 'Android', 'Windows', 'MacOS', 'Linux', 'Others'],
            required: false
        },
        connectivity: {
            type: [String],
            enum: ['Bluetooth', 'Wi-Fi', 'USB-C', 'NFC', '5G', 'Others'],
            required: false
        },
        powerSource: {
            type: String,
            enum: ['Battery-Powered', 'Plug-in', 'Solar', 'Others'],
            required: false
        },
        features: {
            cameraResolution: {
                type: String,
                enum: ['Up to 12MP', '12MP - 24MP', '24MP - 48MP', '48MP+'],
                required: false
            },
            storageCapacity: {
                type: String,
                enum: ['Up to 128GB', '128GB - 256GB', '256GB - 512GB', '512GB+'],
                required: false
            },
            screenSize: {
                type: String,
                enum: ['Up to 5 inches', '5 - 6 inches', '6 - 7 inches', '7 inches+'],
                required: false
            },
        },
        additionalAttributes: {
            weight: {
                type: Number,
                required: false
            },
            dimensions: {
                length: {
                    type: Number,
                    required: false
                },
                width: {
                    type: Number,
                    required: false
                },
                height: {
                    type: Number,
                    required: false
                }
            },
            compatibility: {
                type: [String],
                required: false
            }
        }
    }
)

gadgetsSchema.pre('save', async function (next) {
    console.log(this);
    const isGadestsExists = await Gadgets.findOne({ name: this.name })
    if (isGadestsExists) {
        throw new Error('Gadest is already Exist')
    }
    next()
})

export const Gadgets = model<TGadest>('Gadets', gadgetsSchema)