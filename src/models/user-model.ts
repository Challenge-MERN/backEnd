import { Schema, model } from 'mongoose';

const User = new Schema({
    User_Name: { type: String },
    Mail: { type: String },
    Password: { type: String },
    Code: { type: String },
    Request_PW_Change: { type: Boolean },
}, {
    versionKey: false
});

export default model('User', User, 'User');