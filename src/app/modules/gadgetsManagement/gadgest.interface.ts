
export type TGadgestFeatures = {
    cameraResolution?: 'Up to 12MP' | '12MP - 24MP' | '24MP - 48MP' | '48MP+';
    storageCapacity?: 'Up to 128GB' | '128GB - 256GB' | '256GB - 512GB' | '512GB+';
    screenSize?: 'Up to 5 inches' | '5 - 6 inches' | '6 - 7 inches' | '7 inches+';
}

export type TAdditionalAttributes = {
    weight?: number;
    dimensions?: {
        length?: number;
        width?: number;
        height?: number;
    };
    compatibility?: string[];
}

export type TGadest = {
    name: string
    quantity: number
    price: number;
    releaseDate: Date;
    brand: string;
    modelNumber: string;
    category: 'Smartphones' | 'Laptops' | 'Cameras' | 'Tablets' | 'Wearables' | 'Others';
    operatingSystem?: 'iOS' | 'Android' | 'Windows' | 'MacOS' | 'Linux' | 'Others';
    connectivity?: ('Bluetooth' | 'Wi-Fi' | 'USB-C' | 'NFC' | '5G' | 'Others')[];
    powerSource?: 'Battery-Powered' | 'Plug-in' | 'Solar' | 'Others';
    features?: TGadgestFeatures;
    additionalAttributes?: TAdditionalAttributes;

}