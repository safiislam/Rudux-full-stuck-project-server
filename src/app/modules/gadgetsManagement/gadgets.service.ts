/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TAdditionalAttributes, TGadest, TGadgestFeatures } from "./gadgest.interface";
import { Gadgets } from "./gadgets.model";



const addNewGadgetsIntoDB = async (payload: TGadest) => {

    const reusult = await Gadgets.create(payload)
    return reusult

}

const deleteGadgetsFromDB = async (id: string) => {
    const isExist = await Gadgets.findById(id)
    if (!isExist) {
        throw new Error('This Gadgets is not exist')
    }
    const result = await Gadgets.deleteOne({ _id: id })
    if (result) {
        return { message: 'delete succesfully' }
    }
}
const getSingleGadgetsFromDB = async (id: string) => {
    const isExist = await Gadgets.findById(id)
    if (!isExist) {
        throw new Error('This Gadgets is not exist')
    }
    return isExist
}
const updateSingleGadgets = async (id: string, payload: Partial<TGadest>) => {
    const modifiedUpdateData: Record<string, unknown> = {
        ...payload
    }
    // if (features) {
    //     for (const key in features) {
    //         modifiedUpdateData[`features.${key}`] = features[key]
    //     }
    // }
    const result = await Gadgets.findByIdAndUpdate(id, modifiedUpdateData, { new: true, runValidators: true })
    return result

}

const getAllGadgetsFromDB = async (query: Record<string, unknown>) => {
    let result = Gadgets.find()
    try {

        const minPrice: number = Number(query?.minPrice)
        const maxPrice: number = Number(query?.maxPrice)
        if (minPrice && maxPrice) {
            result = result.where("price").gte(minPrice).lte(maxPrice)
        }
        const startDate: number = Number(query?.startDate)
        const endDate: number = Number(query?.endDate)

        if (startDate && endDate) {
            result = result.where('releaseDate').gte(startDate).lte(endDate)
        }
        const category: string = query?.category as string
        if (category) {
            result = result.where('category').equals(category)
        }
        const operatingSystem: string = query?.operatingSystem as string
        if (operatingSystem) {
            result = result.where('operatingSystem').equals(operatingSystem)
        }
        const powerSource: string = query?.powerSource as string
        if (operatingSystem) {
            result = result.where('powerSource').equals(powerSource)
        }
        const connectivity: string[] = query?.connectivity as string[]
        if (connectivity) {
            result = result.where('connectivity').in(connectivity)
        }

        //  search by model number useing regex

        const modelNumber: string = query?.modelNumber as string
        if (modelNumber) {
            const regex = new RegExp(modelNumber, "i")
            result = result.where('modelNumber').regex(regex)
        }

        const features = query?.features
        if (features) {
            const featuresArray = Array.isArray(features) ? features : [features];
            featuresArray.forEach(feature => {
                const [key, value] = feature.split('=');
                if (key && value) {
                    result = result.where(`features.${key}`).equals(value);
                }
            });
        }

        const additionalAttributes = query?.additionalAttributes
        if (additionalAttributes) {
            console.log(additionalAttributes);
            const addotionalAttributesArray = Array.isArray(additionalAttributes) ? additionalAttributes : [additionalAttributes];
            addotionalAttributesArray.forEach(additionalAttribute => {
                const [key, vaule] = additionalAttribute.split('=')
                if (key === 'compatibility') {
                    result = result.where(`additionalAttributes.${key}`).in(vaule)
                }
                if (key === 'weight' && parseFloat(vaule) > 0) {
                    result = result.where(`additionalAttributes.${key}`).equals(vaule)

                }

            })

            // if (additionalAttributes?.weight !== undefined) {
            //     result = result.where('additionalAttributes.weight').equals(additionalAttributes?.weight);
            // }

            // if (additionalAttributes?.dimensions) {
            //     const { length, width, height } = additionalAttributes?.dimensions;
            //     if (length !== undefined) {
            //         result = result.where('additionalAttributes.dimensions.length').equals(length);
            //     }
            //     if (width !== undefined) {
            //         result = result.where('additionalAttributes.dimensions.width').equals(width);
            //     }
            //     if (height !== undefined) {
            //         result = result.where('additionalAttributes.dimensions.height').equals(height);
            //     }
            // }

            // if (additionalAttributes?.compatibility) {
            //     result = result.where('additionalAttributes.compatibility').in(additionalAttributes?.compatibility);
            // }
        }

        const gadgest = await result.exec()
        return gadgest

    } catch (error) {
        throw new Error('Error Fetching Gadgets')
    }
}

export const GadgetsServices = {
    addNewGadgetsIntoDB,
    deleteGadgetsFromDB,
    getSingleGadgetsFromDB,
    updateSingleGadgets,
    getAllGadgetsFromDB
}