import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { gadgetsValidations } from "./gadgets.validation";
import { gadgetsControllers } from "./gadgets.controller";
import auth from "../../middleware/auth";


const router = Router()


router.post('/add', auth(['customer', 'saller']), validateRequest(gadgetsValidations.gadgetsAddValidationScheam), gadgetsControllers.addNewGadgets)
router.delete('/:id', auth(['customer', 'saller']), gadgetsControllers.deleteGadgets)
router.get('/:id', auth(['customer', 'saller']), gadgetsControllers.getSingleGadgets)
router.get('/', auth(['customer', 'saller']), gadgetsControllers.getAllGadgets)
router.patch('/:id', auth(['customer', 'saller']), validateRequest(gadgetsValidations.gadgetUpdateValdation), gadgetsControllers.updateSingleGadgets)


export const gadgetRoutes = router