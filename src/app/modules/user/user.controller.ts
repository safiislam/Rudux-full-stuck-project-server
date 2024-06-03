import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";


const registrationUser = catchAsync(async (req, res) => {
    const data = req.body
    const result = await UserServices.registrationUserIntoDB(data)
    res.send(result)

})
const loginUser = catchAsync(async (req, res) => {
    const data = req.body
    const result = await UserServices.loginUserFromDD(data)
    res.send(result)
})

export const userControllers = {
    registrationUser,
    loginUser
}