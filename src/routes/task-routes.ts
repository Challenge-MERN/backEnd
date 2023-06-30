import express from 'express';
import TaskController from '../controllers/task-controller';
import { taskRules, validateFields, changeTaskStatusRules } from '../middlewares/task/validate-fields';

const router = express.Router();

router.post('/create-task', taskRules(), validateFields, TaskController.createTask);
router.put('/change-taskStatus', changeTaskStatusRules(), validateFields, TaskController.changeTaskStatus);
router.delete('/delete-task/:TaskName/:UserName', TaskController.deleteTask);
router.get('/get-pendingTasks/:UserName', TaskController.getPendingTasksByUser);
router.get('/get-completedTasks/:UserName', TaskController.getCompletedTasksByUser);
router.put('/edit-task/:Task', taskRules(), validateFields, TaskController.editTask);

export default router;