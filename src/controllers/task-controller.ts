import TaskService from '../services/task-service';
import { Request, Response } from 'express'
import { TaskI } from '../interfaces/task-interfaces';
import { TASK_STATUS } from '../const/const';

const createTask = async (req: Request, res: Response) => {
    try {
        const { TaskName, Description, Date, Importance, UserName } = req.body;
        const task: TaskI = {
            Task_Name: TaskName,
            Date: Date,
            Description: Description,
            Date_Completion: Date,
            Importance: Importance,
            Status: TASK_STATUS.START,
            User_Name: UserName
        };
        const { status, data } = await TaskService.createTask(task);

        status
            ?
            res.status(201).json({
                status: 'OK',
                data
            })
            :
            res.status(409).json({
                status: 'FAILED',
                data
            });

    } catch (err) {
        let message = 'Unknown Error';
        if (err instanceof Error) message = err.message
        res.status(400).json({
            status: 'FAILED',
            data: { error: message || err }
        });
    }
}

const changeTaskStatus = async (req: Request, res: Response) => {
    try {
        const { UserName, TaskName } = req.body;
        const result = await TaskService.changeTaskStatus(UserName, TaskName);
        result > 0
            ?
            res.status(201).json({
                status: 'OK',
                data: 'Tarea actualizada!'
            })
            :
            res.status(409).json({
                status: 'FAILED',
                data: 'Inconveniente en actualizar la tarea'
            });
    } catch (err) {
        let message = 'Unknown Error';
        if (err instanceof Error) message = err.message
        res.status(400).json({
            status: 'FAILED',
            data: { error: message || err }
        });
    }
}

const deleteTask = async (req: Request, res: Response) => {
    try {
        const { TaskName, UserName } = req.params;
        const { deletedCount } = await TaskService.deleteTask(UserName, TaskName);
        deletedCount > 0
            ?
            res.status(202).json({
                status: 'OK',
                data: 'Tarea eliminada existosamente'
            })
            :
            res.status(409).json({
                status: 'FAILED',
                data: 'Inconveniente en eliminar la tarea'
            });
    } catch (err) {
        let message = 'Unknown Error';
        if (err instanceof Error) message = err.message
        res.status(400).json({
            status: 'FAILED',
            data: { error: message || err }
        });
    }
}

const getPendingTasksByUser = async (req: Request, res: Response) => {
    try {
        const { UserName } = req.params;
        const { data, message } = await TaskService.getPendingTasksByUser(UserName);
        res.status(200).json({
            status: 'OK',
            data: {
                data,
                message
            }
        });
    } catch (err) {
        let message = 'Unknown Error';
        if (err instanceof Error) message = err.message
        res.status(400).json({
            status: 'FAILED',
            data: { error: message || err }
        });
    }
}

const getCompletedTasksByUser = async (req: Request, res: Response) => {
    try {
        const { UserName } = req.params;
        const { data, message } = await TaskService.getCompletedTasksByUser(UserName);
        res.status(200).json({
            status: 'OK',
            data: {
                data,
                message
            }
        });
    } catch (err) {
        let message = 'Unknown Error';
        if (err instanceof Error) message = err.message
        res.status(400).json({
            status: 'FAILED',
            data: { error: message || err }
        });
    }
}

const editTask = async (req: Request, res: Response) => {
    try {
        const { TaskName, Status, Description, Date, Importance, UserName } = req.body;
        const { Task } = req.params;
        const newTaskData: TaskI = {
            Task_Name: TaskName,
            Date: Date,
            Description: Description,
            Date_Completion: Date,
            Importance: Importance,
            Status: Status,
            User_Name: UserName
        };
        const modifiedCount = await TaskService.editTask(UserName, Task, newTaskData);
        modifiedCount > 0
            ?
            res.status(202).json({
                status: 'OK',
                data: 'Tarea actualizada'
            })
            :
            res.status(409).json({
                status: 'FAILED',
                data: 'Inconveniente al actualizar la tarea'
            });

    } catch (err) {
        let message = 'Unknown Error';
        if (err instanceof Error) message = err.message
        res.status(400).json({
            status: 'FAILED',
            data: { error: message || err }
        });
    }
}

export default {
    createTask,
    changeTaskStatus,
    deleteTask,
    getPendingTasksByUser,
    getCompletedTasksByUser,
    editTask,
}