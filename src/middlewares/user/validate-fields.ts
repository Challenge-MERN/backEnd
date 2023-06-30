import { validationResult, check, param } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Rules
export const createUserRules = () => {
    return [
        check('UserName', 'UserName es obligatorio').not().isEmpty(),
        check('Mail', 'Correo no válido').isEmail(),
        check('Password', 'El Password es obligatorio').not().isEmpty(),
        check('Password', 'El Password debe de ser mas de 5 letas').isLength({ min: 5 }),
    ];
}

export const authUserRules = () => {
    return [
        check('UserName', 'UserName es obligatorio').not().isEmpty(),
        check('Password', 'El Password es obligatorio').not().isEmpty(),
        check('Password', 'El Password debe de ser mas de 5 letas').isLength({ min: 5 }),
    ];
}

// Validations
export const validateFields = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors: any[] = [];
    errors.array().map((err: any) => extractedErrors.push({ [err.path]: err.msg }));

    res.status(422).json({
        status: 'FAILED',
        data: extractedErrors,
    });
}


