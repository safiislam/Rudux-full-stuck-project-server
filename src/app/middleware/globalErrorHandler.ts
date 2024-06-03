/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";


const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const statusCode = 500
    let message = err.message || 'Something went wrong!';
    let errorMessage = ''
    if (err instanceof ZodError) {
        const requiredField = err.issues.map(el => el.path.slice(-1))
        errorMessage = (requiredField.map(el => `${el} is required.`)).join(' ')
        message = "Validation Error"
    } else if (err?.name === "ValidationError") {
        errorMessage = (Object.values(err?.errors).map(val => val?.path)).join(',') + ` is requiried`
    }
    else if (err?.name === 'CastError') {
        errorMessage = err.value.id + ` is not a valid ID!`
        message = 'Invalid ID'
    }

    return res.status(statusCode).json({
        success: false,
        errorMessage,
        message,
        err,
        stack: err?.stack
    });

}

export default globalErrorHandler