import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import exercicesRoutes from './routes/exercices.js';
import workoutExercicesRoutes from './routes/workoutexercices.js';
import workoutRoutineRoutes from './routes/workoutroutines.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
/*app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));*/
app.use(cors());

app.use('/auth', authRoutes);
app.use('/exercices', exercicesRoutes);
app.use('/workoutexercice', workoutExercicesRoutes);
app.use('/workoutroutine', workoutRoutineRoutes);

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(PORT, () => {
        console.log(`Listening to the port: ${PORT}`);
    })
})
.catch((error) => {
    console.log(`${error} could not connect.`);
})
