import express from 'express';
import TaskController from '../controllers/task-controller';

const router = express.Router();

router.post('/create-task', TaskController.createTask);
router.put('/change-taskStatus', TaskController.changeTaskStatus);
router.delete('/delete-task/:TaskName/:UserName', TaskController.deleteTask);
router.get('/get-pendingTasks/:UserName', TaskController.getPendingTasksByUser);
router.get('/get-completedTasks/:UserName', TaskController.getCompletedTasksByUser);
router.put('/edit-task/:Task', TaskController.editTask);

export default router;