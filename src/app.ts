import express from 'express';
import { LinksController } from './controllers/LinksController';
import { linkRoutes } from './routes/LinkRoutes';
import { env } from './env';

const app = express();

const PORT = env.PORT || 8000

app.use(express.json());

app.use('/', linkRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
