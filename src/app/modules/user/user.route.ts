import { Router } from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { UserValidations } from "./user.validation";



const router = Router()

router.post('/registration', validateRequest(UserValidations.userValidationSchema), userControllers.registrationUser)
router.post('/login', validateRequest(UserValidations.userLoginValidationSchema), userControllers.loginUser)

export const userRouter = router