import { Router } from "express";
import { userRouter } from "../modules/user/user.route";
import { gadgetRoutes } from "../modules/gadgetsManagement/gadgets.route";


const router = Router()

const mouduleRoutes = [
    {
        path: '/auth',
        route: userRouter
    },
    {
        path: '/gadget',
        route: gadgetRoutes
    },
    {
        path: '/salesManagement',
        route: gadgetRoutes
    },
]

mouduleRoutes.map(item => router.use(item.path, item.route))



export default router