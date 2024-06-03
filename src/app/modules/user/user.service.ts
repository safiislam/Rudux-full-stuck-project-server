import { generateToken } from "../../utils/generateToken"
import { TUser } from "./user.interface"
import { User } from "./user.model"
import bcrypt from 'bcrypt';



const registrationUserIntoDB = async (payload: TUser) => {

    const result = await User.create(payload)
    if (result) {
        // const result1 = await User.findById(result?._id).select('-password')
        const tokenInfo = {
            userId: result._id,
            email: result.email,
            role: result.role
        }
        const token = generateToken(tokenInfo)
        return {
            token
        }
    }

}
const loginUserFromDD = async (payload: { email: string, password: string }) => {

    const isEmailExist = await User.findOne({ email: payload.email }).select('+password')
    if (!isEmailExist) {
        throw new Error('This User is not Exist')
    }
    const isPasswordMatched = await bcrypt.compare(payload.password, isEmailExist.password)
    if (!isPasswordMatched) {
        throw new Error('Password Doesnot matched')
    }
    const userInfo = {
        userId: isEmailExist._id,
        email: isEmailExist.email,
        role: isEmailExist.role
    }

    const token = generateToken(userInfo)
    return { token }

}

export const UserServices = {
    registrationUserIntoDB,
    loginUserFromDD
}