import { Schema, model } from "mongoose";
import { TSeles } from "./salesManagement.interfeac";




const salesSchema = new Schema<TSeles>({
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Gadgets'
    },
    buyerName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    saleDate: {
        type: Date,
        required: true
    },


}, {
    timestamps: true
})
export const Sales = model<TSeles>('Sales', salesSchema);