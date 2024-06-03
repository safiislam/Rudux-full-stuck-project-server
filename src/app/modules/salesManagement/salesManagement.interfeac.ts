import { Types } from "mongoose"




export type TSeles = {
    productId: Types.ObjectId,
    quantity: number,
    buyerName: string
    saleDate: Date
}