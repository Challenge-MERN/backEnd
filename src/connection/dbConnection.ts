import mongoose from 'mongoose';

const dataBaseUrl: string | undefined = process.env.DATABASE;


mongoose.set('strictQuery', false);

mongoose
    .connect(`mongodb://${dataBaseUrl}`)
    .then((db: any) => console.log('DB is connected'))
    .catch((err: any) => console.error(err));

const conexion = mongoose.Collection;