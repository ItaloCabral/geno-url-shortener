import { Request, Response } from 'express';

export class DebugController {
    public healthCheck(request: Request, response: Response) {
        return response.status(200).json({ message: 'Up and running!' });
    }
}