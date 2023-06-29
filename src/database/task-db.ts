import TaskModel from '../models/task-model';
import { TaskI } from '../interfaces/task-interfaces';

const createTask = async (newTask: TaskI) => {
    try {
        const task = new TaskModel(newTask);
        if (await task.save())
            return {
                status: true,
                data: 'Tarea creada!'
            };
        else
            return {
                status: false,
                data: new Error('Error al crear la tarea').message
            };
    } catch (err) {
        let message = 'Unknown Error';
        if (err instanceof Error) message = err.message
        throw {
            status: 500,
            message: message
        };
    }
}

const deleteTask = async (userName: string, taskName: string) => {
    try {
        const deleteTask = await TaskModel.deleteMany({
            User_Name: userName,
            Task_Name: taskName
        });
        return { deletedCount: deleteTask.deletedCount };
    } catch (err) {
        let message = 'Unknown Error';
        if (err instanceof Error) message = err.message
        throw {
            status: 500,
            message: message
        };
    }
}

const editTask = async (userName: string, taskName: string, newTaskData: TaskI) => {
    try {
        const editedTaskData = await TaskModel.updateMany({
            User_Name: userName,
            Task_Name: taskName
        }, {
            $set: newTaskData
        });
        return editedTaskData.modifiedCount;
    } catch (err) {
        let message = 'Unknown Error';
        if (err instanceof Error) message = err.message
        throw {
            status: 500,
            message: message
        };
    }
}

const changeTaskStatus = async (userName: string, taskName: string, status: boolean, dateCompletion: string) => {
    try {
        const updatedStatusTask = await TaskModel.updateMany({
            User_Name: userName,
            Task_Name: taskName
        }, {
            $set: {
                Date_Completion: dateCompletion,
                Status: status
            }
        });
        return updatedStatusTask.modifiedCount;
    } catch (err) {
        let message = 'Unknown Error';
        if (err instanceof Error) message = err.message
        throw {
            status: 500,
            message: message
        };
    }
}

const getPedindgTasksByUser = async (userName: string) => {
    try {
        const pendingTasks = await TaskModel.find({
            User_Name: userName,
            Status: false
        });
        const tasksCompleted = await TaskModel.find({
            User_Name: userName,
            Status: true
        });
        return {
            pendingTasks,
            tasksCompleted
        };
    } catch (err) {
        let message = 'Unknown Error';
        if (err instanceof Error) message = err.message
        throw {
            status: 500,
            message: message
        };
    }
}

const getCompletedTasksByUser = async (userName: string) => {
    try {
        const tasksCompleted = await TaskModel.find({
            User_Name: userName,
            Status: true
        }, {

            _id: 0
        });
        return { tasksCompleted };
    } catch (err) {
        let message = 'Unknown Error';
        if (err instanceof Error) message = err.message
        throw {
            status: 500,
            message: message
        };
    }
}

export default {
    createTask,
    getPedindgTasksByUser,
    getCompletedTasksByUser,
    deleteTask,
    editTask,
    changeTaskStatus,
}