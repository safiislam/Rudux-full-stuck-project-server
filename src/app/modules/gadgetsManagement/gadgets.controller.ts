import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { GadgetsServices } from "./gadgets.service";


const addNewGadgets = catchAsync(async (req, res) => {
    const data = req.body
    console.log(data);
    const result = await GadgetsServices.addNewGadgetsIntoDB(data)
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'Gadgets Add Successfully',
        data: result
    })

})
const deleteGadgets = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await GadgetsServices.deleteGadgetsFromDB(id)
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'Gadgets delete Successfully',
        data: result
    })
})
const getSingleGadgets = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await GadgetsServices.getSingleGadgetsFromDB(id)
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'Get Gadget Successfully',
        data: result
    })

})
const getAllGadgets = catchAsync(async (req, res) => {
    const result = await GadgetsServices.getAllGadgetsFromDB(req.query)
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'Get Gadget Successfully',
        data: result
    })
})

const updateSingleGadgets = catchAsync(async (req, res) => {
    const { id } = req.params
    const data = req.body
    const result = await GadgetsServices.updateSingleGadgets(id, data)
    res.json(result)
})


export const gadgetsControllers = {
    addNewGadgets,
    deleteGadgets,
    getSingleGadgets,
    updateSingleGadgets,
    getAllGadgets
} 