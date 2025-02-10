import { Router } from "express";
import { DebugController } from "../controllers/DebugController";

const routes = Router();

const debugController = new DebugController();

routes.get('/check', debugController.healthCheck.bind(debugController));

export { routes as debugRoutes};
