import jsonwebtoken from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';

const SECRET_KEY = process.env.SECRET_KEY || '';

export const validateJwt = (req: Request, res: Response, next: NextFunction) => {
    const response = {
        status: 'FAILED',
        data: 'Usuario no valido'
    }
    try {
        const jwt: string = req.header('authorization') || '';
        const payload = jsonwebtoken.verify(jwt, SECRET_KEY);
        if (payload)
            return next();
        else
            return res.status(401).json(response);
    } catch (err) {
        return res.status(401).json(response);
    }
}