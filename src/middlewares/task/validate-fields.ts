import { validationResult, check } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Rules
export const taskRules = () => {
    return [
        check('TaskName', 'TaskName es obligatorio').not().isEmpty(),
        check('Date', 'Date es obligatorio').not().isEmpty(),
        check('Description', 'Description es obligatorio').not().isEmpty(),
        check('Importance', 'Importance es obligatorio').not().isEmpty(),
        check('UserName', 'UserName es obligatorio').not().isEmpty(),
    ];
}

export const changeTaskStatusRules = () => {
    return [
        check('UserName', 'UserName es obligatorio').not().isEmpty(),
        check('TaskName', 'TaskName es obligatorio').not().isEmpty(),
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


