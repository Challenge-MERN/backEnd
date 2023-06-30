import express from 'express';
import UserController from '../controllers/user-controller';
import { createUserRules, validateFields, authUserRules, userParams } from '../middlewares/user/validate-fields';

const router = express.Router();

router.post('/create-user', createUserRules(), validateFields, UserController.createUser);
router.get('/valid-userName/:UserName', UserController.validateExistingUserName);
router.get('/valid-email/:Email', UserController.validateEmailAvailable);
router.get('/forgot-password/:UserName', userParams(), validateFields, UserController.forgotPassword);
router.post('/auth-user', authUserRules(), validateFields, UserController.authUser);
router.put('/change-password', authUserRules(), validateFields, UserController.changePassword);

export default router;