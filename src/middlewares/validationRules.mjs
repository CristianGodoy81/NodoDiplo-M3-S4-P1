import { body } from 'express-validator';

export const registerValidationRules = ()=>
    [
        body('nombreSuperHeroe')
            .notEmpty().withMessage('Campo obligatorio')
            .isLength({min:3,max:60}).withMessage('Debe tener entre 3 y 60 caracteres')
            .trim(),
        body('nombreReal')
            .notEmpty().withMessage('Campo obligatorio')
            .isLength({min:3,max:60}).withMessage('Debe tener entre 3 y 60 caracteres')
            .trim(),
        body('edad')
            .notEmpty().withMessage('Campo obligatorio')
            .isInt({min:0}).withMessage('Debe ser un numero entero positivo')
            .trim(),
        body('poderes')
            //.notEmpty().withMessage('Campo obligatorio')
            .custom((value) => {
                const poderesArr = value.split(',').map(p => p.trim()).filter(p => p.length > 0);
                if (poderesArr.length === 0) {
                    throw new Error('Debe ingresar al menos un poder');
                }
                if (!poderesArr.every(item => typeof item === 'string')) { // every() devuelve true solo si todos cumplen la condición
                    throw new Error('Cada poder debe ser un string');
                }
                if (!poderesArr.every(item => item.length >= 3 && item.length <= 60)) { // every() devuelve true solo si todos cumplen la condición
                    throw new Error('Cada poder debe tener entre 3 y 60 caracteres');
                }
                return true;
            }),
    ];