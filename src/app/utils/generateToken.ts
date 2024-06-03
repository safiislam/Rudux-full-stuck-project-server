import jwt from 'jsonwebtoken';
import config from '../config';
import { Types } from 'mongoose';


type TTokenData = {
    userId: Types.ObjectId,
    email: string,
}

export const generateToken = (tokenData: TTokenData) => {
    const token = jwt.sign(tokenData, config.privateKey as string, { expiresIn: config.expiresIn })
    return token
}