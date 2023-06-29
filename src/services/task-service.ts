import TaskDB from '../database/task-db';
import { TaskI } from '../interfaces/task-interfaces';
import { TASK_STATUS } from '../const/const';

const createTask = async (newTask: TaskI) => {
    try {
        return await TaskDB.createTask(newTask);
    } catch (err) {
        throw err;
    }
}

const changeTaskStatus = async (userName: string, taskName: string) => {
    try {
        const actualDate = new Date().toISOString();
        return TaskDB.changeTaskStatus(userName, taskName, TASK_STATUS.FINISH, actualDate);
    } catch (err) {
        throw err;
    }
}

const deleteTask = async (userName: string, taskName: string) => {
    try {
        return TaskDB.deleteTask(userName, taskName);
    } catch (err) {
        throw err;
    }
}

const editTask = async (userName: string, taskName: string, newTaskData: TaskI) => {
    try {
        return TaskDB.editTask(userName, taskName, newTaskData);
    } catch (err) {
        throw err;
    }
}

const getPendingTasksByUser = async (userName: string) => {
    try {
        const { pendingTasks, tasksCompleted } = await TaskDB.getPedindgTasksByUser(userName);
        if(pendingTasks.length === 0 && tasksCompleted.length === 0){
            return {
                message: 'Sin registro de tareas',
                data: []
            }
        } else if (pendingTasks.length === 0 && tasksCompleted.length > 0){
            return {
                message: 'Todas las tareas completadas!',
                data: []
            }
        } else {
            return {
                message: 'Tareas pendientes',
                data: pendingTasks
            }
        }
    } catch (err) {
        throw err;
    }
}

const getCompletedTasksByUser = async (userName: string) => {
    try {
        const { tasksCompleted } = await TaskDB.getCompletedTasksByUser(userName);
        if(tasksCompleted.length === 0){
            return {
                message: 'Sin registro de tareas',
                data: []
            }
        } else {
            return {
                message: 'Tareas completadas!',
                data: tasksCompleted
            }
        }
    } catch (err) {
        throw err;
    }
}

export default {
    createTask,
    changeTaskStatus,
    getPendingTasksByUser,
    getCompletedTasksByUser,
    deleteTask,
    editTask,
}