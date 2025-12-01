import { validationResult } from "express-validator";

export const handleValidationErrors = (req, res, next)=>{
    console.log("En este punto estamos en: errorMiddleware.mjs / handleValidationErrors()");
    //console.log(`body: ${JSON.stringify(req.body)}`);
    const errors = validationResult(req);
    //console.log(`errors: ${JSON.stringify(errors)}`);
    if (!errors.isEmpty()){ // Review fallida: .isEmpty no tenia los parentesis
        //return res.status(400).json({errors: errors.array()});
        return res.status(400).render('superhero/addSuperhero', {
            title: 'Agregar',
            css: '/css/formSuperhero.css',
            formData: req.body,
            errors: errors.errors
        });
    }
    next();
}