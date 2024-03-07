import { Router } from "express";
import { LinksController } from "../controllers/LinksController";

const routes = Router();

const linksController = new LinksController();

routes.get('/links/:userId', linksController.listAll.bind(linksController));

routes.post('/links', linksController.createLink.bind(linksController));

routes.get('/link/:endpoint', linksController.redirect.bind(linksController));

export { routes as linkRoutes};
