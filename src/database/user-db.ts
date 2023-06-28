import UserModel from '../models/user-model';

const createUser = async (userName: string, mail: string, password: string) => {
    try {
        const newUser = new UserModel({ User_Name: userName, Mail: mail, Password: password });
        if (await newUser.save()) {
            return true;
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

const validExistingUserName = async (userName: string) => {
    try {
        const exist = await UserModel.findOne({ User_Name: userName });
        if (exist)
            return true;
        else
            return false;
    } catch (err: any) {
        throw {
            status: 500,
            message: err.message
        };
    }
}

export default {
    createUser,
    validExistingUserName,
};