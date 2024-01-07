import { Request, Response, Router } from 'express';

const routes = Router();

routes.get('/debug', (request: Request, response: Response) => {
    return response.json({ message: 'Up and running!' });
});

export default routes;
