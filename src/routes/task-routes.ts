import express from 'express';
import TaskController from '../controllers/task-controller';
import { taskRules, validateFields, changeTaskStatusRules } from '../middlewares/task/validate-fields';
import { validateJwt } from '../middlewares/validate-token';

const router = express.Router();

router.post('/create-task', validateJwt, taskRules(), validateFields, TaskController.createTask);
router.put('/change-taskStatus', validateJwt, changeTaskStatusRules(), validateFields, TaskController.changeTaskStatus);
router.delete('/delete-task/:TaskName/:UserName', validateJwt, TaskController.deleteTask);
router.get('/get-pendingTasks/:UserName',validateJwt, TaskController.getPendingTasksByUser);
router.get('/get-completedTasks/:UserName', validateJwt, TaskController.getCompletedTasksByUser);
router.put('/edit-task/:Task', validateJwt, taskRules(), validateFields, TaskController.editTask);

export default router;