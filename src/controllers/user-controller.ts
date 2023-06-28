import UserService from '../services/user-service';
import { Request, Response } from 'express';

const createUser = async (req: Request, res: Response) => {
    try {
        const { UserName, Mail, Password } = req.body;
        const result = await UserService.createUser(UserName, Mail, Password);
        if(result){
            res.status(201).json({
                status: 'OK',
                data: 'Registro con éxito!'
            });
        }
    } catch (err) {
        let message = 'Unknown Error';
        if(err instanceof Error) message = err.message
        res.status(400).json({
            status: 'FAILED',
            data: { error: message || err }
        });
    }
}

const validExistingUserName = async (req: Request, res: Response) => {
    try {
        const { UserName } = req.params;
        const result = await UserService.validExistingUserName(UserName);
        if(!result)
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
        if(err instanceof Error) message = err.message
        res.status(400).json({
            status: 'FAILED',
            data: { error: message || err }
        });
    }
}

export default {
    createUser,
    validExistingUserName,
}