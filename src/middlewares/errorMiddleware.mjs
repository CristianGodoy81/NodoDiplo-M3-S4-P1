import { validationResult } from "express-validator";

export const handleValidationErrors = (req, res, next)=>{
    console.log("En este punto estamos en: errorMiddleware.mjs / handleValidationErrors()");
    const errors = validationResult(req);
    if (!errors.isEmpty()){ // Review fallida: .isEmpty no tenia los parentesis
        return res.status(400).json({errors: errors.array()});
    }
    next();
}