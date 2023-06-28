import mongoose from 'mongoose';

const DataBase: string | undefined = process.env.DATABASE;

mongoose.set('strictQuery', false);

mongoose
    .connect(`mongodb://${DataBase}`)
    .then((db) => console.log('DB is connected'))
    .catch((err) => console.error(err));

const conexion = mongoose.Collection;