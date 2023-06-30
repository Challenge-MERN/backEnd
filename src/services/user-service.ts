import UserDB from '../database/user-db';
import bcrypt from 'bcryptjs';
import securePwd from 'secure-random-password';
import jwt from 'jsonwebtoken';
import { AUTH_USER_RESULT } from '../const/const';

const nodemailer = require('nodemailer');
const ENLACE = process.env.URL_RESTOREPWD;
const { SERVICE, EMAIL_SERVICE, EMAIL_SERVICE_PWD } = process.env;
const SECRET_KEY: string = process.env.SECRET_KEY || '';

const createUser = async (userName: string, mail: string, password: string) => {
    try {
        const verifyUserName = await validExistingUserName(userName);
        const verifyEmail = await validateEmailAvailable(mail);
        if (verifyUserName) {
            if (verifyEmail) {
                const newPassword = bcrypt.hashSync(password);
                const res = await UserDB.createUser(userName.toUpperCase(), mail, newPassword);
                return {
                    status: res?.status,
                    data: res?.data
                }
            } else {
                return {
                    status: false,
                    data: 'Email utilizado en otro usuario'
                }
            }
        } else {
            return {
                status: false,
                data: 'Nombre de usuario ya utilizado'
            }
        }
    } catch (err) {
        throw err;
    }
}

const authUser = async (userName: string, password: string) => {
    try {
        const user = await UserDB.getUserData(userName.toUpperCase());
        const userPwd: any = user?.Password;
        if (user) {
            const passwordResult = bcrypt.compareSync(password, userPwd);
            if (passwordResult) {
                const expiresIn = '5h';
                const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });
                const dataUser = {
                    name: user.User_Name,
                    email: user.Mail,
                    accessToken: accessToken,
                    expiresIn: expiresIn,
                    ok: true
                };
                return {
                    status: AUTH_USER_RESULT.SUCCESS,
                    data: dataUser
                };
            } else {
                return {
                    status: AUTH_USER_RESULT.FAILED,
                    data: 'Nombre de usuario o contraseña incorrectos!'
                };
            }
        } else
            return {
                status: AUTH_USER_RESULT.NOT_FOUND,
                data: 'Usuario no encontrado'
            };

    } catch (err) {
        throw err;
    }
}

const changePassword = async (userName: string, password: string) => {
    try {
        const newPassword = bcrypt.hashSync(password);
        const { modifiedCount } = await UserDB.changePassword(userName.toUpperCase(), newPassword);
        if (modifiedCount > 0)
            return {
                status: true,
                data: 'Contraseña actualizada con éxito!'
            };
        else
            return {
                status: false,
                data: 'Error al actualizar contraseña'
            };
    } catch (err) {
        throw err;
    }
}

const validExistingUserName = async (userName: string) => {
    try {
        return await UserDB.validExistingUserName(userName.toUpperCase());
    } catch (err) {
        throw err;
    }
}

const validateEmailAvailable = async (email: string) => {
    try {
        return await UserDB.validateEmailAvailable(email);
    } catch (err) {
        throw err;
    }
}

const forgotPassword = async (userName: string) => {
    try {
        const code = securePwd.randomPassword({ characters: [securePwd.lower, securePwd.upper, securePwd.digits] });
        const { status, email } = await UserDB.forgotPassword(userName.toUpperCase(), code);
        if (status) {
            const transporter = nodemailer.createTransport({
                service: SERVICE,
                auth: {
                    user: `${EMAIL_SERVICE}`,
                    pass: `${EMAIL_SERVICE_PWD}`
                }
            });
            let mailOptions = {
                from: `TODO APP ${EMAIL_SERVICE} `,
                to: email,
                subject: "Restablecer contraseña",
                text: `Ingrese al siguiente enlace, el cual le pedirá el siguiente código para restablecer su contraseña\n\nEnlace: ${ENLACE}/${userName}\n\nCodigo: ${code}`,
            }
            transporter.verify(function (error: Error) {
                if (error) console.log(`Verify error: ${error}`);
            });
            transporter.sendMail(mailOptions, (error: Error) => {
                if (error) {
                    console.log(`error: ${error}`);
                } else {
                    console.log("Email enviado correctamente");
                }
            });
            return {
                status: true,
                data: 'Verificar el email usado al momento de registrarse'
            };
        } else {
            return {
                status: false,
                data: 'Usuario no encontrado'
            };
        }
    } catch (err) {
        throw err;
    }
}

export default {
    createUser,
    validExistingUserName,
    validateEmailAvailable,
    forgotPassword,
    authUser,
    changePassword,
}