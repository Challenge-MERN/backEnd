import express from 'express';
import UserController from '../controllers/user-controller';

const router = express.Router();

router.post('/create-user', UserController.createUser);
router.get('/valid-userName/:UserName', UserController.validateExistingUserName);
router.get('/valid-email/:Email', UserController.validateEmailAvailable);
router.get('/forgot-password/:UserName', UserController.forgotPassword);
router.post('/auth-user', UserController.authUser);
router.put('/change-password', UserController.changePassword);

export default router;