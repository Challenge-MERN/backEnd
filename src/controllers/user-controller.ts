import UserService from '../services/user-service';
import { AUTH_USER_RESULT } from '../const/const';
import { Request, Response } from 'express';

const createUser = async (req: Request, res: Response) => {
    try {
        const { UserName, Mail, Password } = req.body;
        const { status, data } = await UserService.createUser(UserName, Mail, Password);
        if (status) 
            res.status(201).json({
                status: 'OK',
                data: data
            });
        else 
            res.status(409).json({
                status: 'FAILED',
                data: data
            });
    } catch (err) {
        let message = 'Unknown Error';
        if (err instanceof Error) message = err.message
        res.status(400).json({
            status: 'FAILED',
            data: { error: message || err }
        });
    }
}

const authUser = async (req: Request, res: Response) => {
    try {
        const { UserName, Password } = req.body;
        const { status, data } = await UserService.authUser(UserName, Password);
        let jsonResponse = {
            status: '',
            data
        };
        switch (status) {
            case AUTH_USER_RESULT.SUCCESS:
                jsonResponse.status = 'OK';
                res.status(200).json(jsonResponse);
                break;
            case AUTH_USER_RESULT.FAILED:
                jsonResponse.status = 'FAILED';
                res.status(409).json(jsonResponse);
                break;
            case AUTH_USER_RESULT.NOT_FOUND:
                jsonResponse.status = 'FAILED';
                res.status(404).json(jsonResponse);
                break;
        }
    } catch (err) {
        let message = 'Unknown Error';
        if (err instanceof Error) message = err.message
        res.status(400).json({
            status: 'FAILED',
            data: { error: message || err }
        });
    }
}

const validateExistingUserName = async (req: Request, res: Response) => {
    try {
        const { UserName } = req.params;
        const result = await UserService.validExistingUserName(UserName);
        if (result)
            res.status(200).json({
                status: 'OK',
                data: 'Nombre de usuario disponible'
            });
        else
            res.status(200).json({
                status: 'FALSE',
                data: 'Nombre actualmente utilizado'
            });
    } catch (err) {
        let message = 'Unknown Error';
        if (err instanceof Error) message = err.message
        res.status(400).json({
            status: 'FAILED',
            data: { error: message || err }
        });
    }
}

const validateEmailAvailable = async (req: Request, res: Response) => {
    try {
        const { Email } = req.params;
        const result = await UserService.validateEmailAvailable(Email);
        if (result)
            res.status(200).json({
                status: 'OK',
                data: 'Email disponible'
            });
        else
            res.status(200).json({
                status: 'FALSE',
                data: 'Email asociado a otra cuenta'
            });
    } catch (err) {
        let message = 'Unknown Error';
        if (err instanceof Error) message = err.message
        res.status(400).json({
            status: 'FAILED',
            data: { error: message || err }
        });
    }
}

const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { UserName } = req.params;
        const { status, data } = await UserService.forgotPassword(UserName);
        status
            ?
            res.status(200).json({
                status: 'OK',
                data: data
            })
            :
            res.status(400).json({
                status: 'FAILED',
                data: data
            });

    } catch (err) {
        let message = 'Unknown Error';
        if (err instanceof Error) message = err.message
        res.status(400).json({
            status: 'FAILED',
            data: { error: message || err }
        });
    }
}

const changePassword = async (req: Request, res: Response) => {
    try {
        const { UserName, Password } = req.body;
        const { status, data } = await UserService.changePassword(UserName, Password);
        res.status( status ? 200 : 409).json({
            status: `${status ? 'OK' : 'FAILED'}`,
            data
        });
    } catch (err) {
        let message = 'Unknown Error';
        if (err instanceof Error) message = err.message
        res.status(400).json({
            status: 'FAILED',
            data: { error: message || err }
        });
    }
}

export default {
    createUser,
    validateExistingUserName,
    validateEmailAvailable,
    forgotPassword,
    authUser,
    changePassword,
}