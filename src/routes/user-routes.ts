import express from 'express';
import UserController from '../controllers/user-controller';

const router = express.Router();

router.post('/create-user', UserController.createUser);
router.get('/valid-userName/:UserName', UserController.validExistingUserName);

export default router;