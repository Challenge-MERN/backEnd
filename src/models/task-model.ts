import { Schema, model } from 'mongoose';

const Task = new Schema({
    Task_Name: { type: String },
    Description: { type: String },
    Date: { type: String },
    Date_Completion: { type: String },
    Importance: { type: String },
    Status: { type: Boolean },
    User_Name: { type: String }
}, {
    versionKey: false
});

export default model('Task', Task, 'Task');