import express from 'express';
import cors from 'cors'

import { env } from './env';

import { linkRoutes } from './routes/LinkRoutes';
import { debugRoutes } from './routes/DebugRoutes';

const app = express();

const PORT = env.PORT || 8000

app.use(express.json());

app.use(cors({
    origin: '*', // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}))

app.use('/', linkRoutes);

app.use(debugRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
