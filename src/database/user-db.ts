import UserModel from '../models/user-model';

const createUser = async (userName: string, mail: string, password: string) => {
    try {
        const newUser = new UserModel({ User_Name: userName, Mail: mail, Password: password });
        if (await newUser.save()) {
            return { status: true, data: 'Registro con éxito!' };
        }
    } catch (err) {
        let message = 'Unknown Error';
        if (err instanceof Error) message = err.message
        throw {
            status: 500,
            message: message
        };
    }
}

const changePassword = async (userName: string, newPassword: string) => {
    try {
        return await UserModel.updateMany({ User_Name: userName }, { $set: { Password: newPassword, Code: '', Request_PW_Change: false } });
    } catch (err) {
        let message = 'Unknown Error';
        if (err instanceof Error) message = err.message
        throw {
            status: 500,
            message: message
        };
    }
}

const getUserData = async (userName: string) => {
    try {
        return await UserModel.findOne({ User_Name: userName }, { _id: 0 });
    } catch (err) {
        let message = 'Unknown Error';
        if (err instanceof Error) message = err.message
        throw {
            status: 500,
            message: message
        };
    }
}

const validExistingUserName = async (userName: string) => {
    try {
        const available = await UserModel.findOne({ User_Name: userName });
        if (available)
            return false;
        else
            return true;
    } catch (err) {
        let message = 'Unknown Error';
        if (err instanceof Error) message = err.message
        throw {
            status: 500,
            message: message
        };
    }
}

const validateEmailAvailable = async (email: string) => {
    try {
        const available = await UserModel.findOne({ Mail: email });
        if (available)
            return false;
        else
            return true;
    } catch (err) {
        let message = 'Unknown Error';
        if (err instanceof Error) message = err.message
        throw {
            status: 500,
            message: message
        };
    }
}

const forgotPassword = async (userName: string, code: string) => {
    try {
        const dataUpdated = await UserModel.updateMany({ User_Name: userName }, { $set: { Code: code, Request_PW_Change: true } });
        if (dataUpdated.modifiedCount !== 0) {
            const email = await UserModel.findOne({ User_Name: userName }, { Mail: 1, _id: 0 });
            return {
                status: true,
                email: email?.Mail
            };
        } else
            return { status: false };
    } catch (err) {
        let message = 'Unknown Error';
        if (err instanceof Error) message = err.message
        throw {
            status: 500,
            message: message
        };
    }
}

export default {
    createUser,
    validExistingUserName,
    validateEmailAvailable,
    forgotPassword,
    getUserData,
    changePassword,
};