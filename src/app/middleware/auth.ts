import { Request, Response, NextFunction } from "express"
import { TUserRole } from "../modules/user/user.interface"
import catchAsync from "../utils/catchAsync"
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import { User } from "../modules/user/user.model";


const auth = (requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization
        if (!token) {
            throw new Error('Your are not authorized')
        }
        try {
            const decoded = jwt.verify(token, config.privateKey as string)
            const { userId, role } = decoded as JwtPayload
            const isUserExist = await User.findById(userId)
            if (!isUserExist) {
                throw new Error('Your are not authorized')
            }
            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new Error('Your are not authorized')
            }
            if (isUserExist?.role !== role) {
                throw new Error('Your are not authorized')
            }
            req.user = decoded as JwtPayload
            next()

        } catch (error) {
            throw new Error('Your are not authorized')
        }

    })

}


export default auth