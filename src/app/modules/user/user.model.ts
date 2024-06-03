import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";



const userSchema = new Schema<TUser>({
    name: { type: String, required: true },
    email: {
        type: String, required: true, unique: true,
    },
    password: { type: String, required: true, select: 0 },
    role: { type: String, enum: ["saller", "customer"], default: 'customer' }
}, {
    timestamps: true
})


userSchema.pre('save', async function (next) {

    const isEmailExist = await User.findOne({ email: this.email, name: this.name })
    const isNameExist = await User.findOne({ name: this.name })
    if (isEmailExist) {
        throw new Error('This email already exist')
    }
    if (isNameExist) {
        throw new Error('This  name already exist')
    }
    this.password = bcrypt.hashSync(this.password, Number(config.saltRounds));
    next()
})






export const User = model<TUser>('User', userSchema)