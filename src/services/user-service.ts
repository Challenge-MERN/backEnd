import UserDB from '../database/user-db';
import bcryptjs from 'bcryptjs';

const createUser = async (userName: string, mail: string, password: string) => {
    try {
        const newPassword = bcryptjs.hashSync(password);
        return await UserDB.createUser(userName.toUpperCase(), mail, newPassword);
    } catch (err) {
        throw err;
    }
}

const validExistingUserName = async (userName: string) =>{
    try {
        return await UserDB.validExistingUserName(userName.toUpperCase());
    } catch (err) {
        throw err;
    }
}

export default {
    createUser,
    validExistingUserName,
}