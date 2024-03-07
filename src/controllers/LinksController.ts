import {Request, Response} from "express";

import {LinkRepository} from "../repositories/link-repository";

import {ListShortLinks} from "../use-cases/list-short-links";
import {GenerateShortLink} from "../use-cases/generate-short-link";
import { RetrieveShortLink } from "../use-cases/retrieve-short-link";

import { MongoDbLinkRepository } from "../repositories/implementations/mongodb/link-repository";


export class LinksController {

    private _repository!: LinkRepository;

    constructor() {
        this.repository = new MongoDbLinkRepository();
    }

    get repository() {
        return this._repository;
    }

    set repository(value) {
        this._repository = value;
    }

    listAll(request: Request, response: Response) {
        const listShortLinks = new ListShortLinks(this.repository);

        const userId = request.body['userId'] ?? null;

        if(!userId) return response.status(400).json({
            error: "User ID is required"
        });

        return listShortLinks.execute({userId})
            .then(links => response.json(links))
            .catch(error => response.status(400).json({
                error: error.message
            }));
    }

    createLink(request: Request, response: Response) {
        const {userId, url} = request.body;
        const generateShortLink = new GenerateShortLink(this.repository);

        return generateShortLink.execute({userId, url})
            .then(link => response.json(link))
            .catch(error => response.status(400).json({
                error: error.message
            }));
    }

    redirect(request: Request, response: Response) {

        console.log("[CONTROLLER]: ", request.params.endpoint);

        const endpoint = request.params.endpoint;

        const retrieveShortLink = new RetrieveShortLink(this.repository);

        retrieveShortLink.execute({endpoint})
            .then(link => {
                if(!link.includes('https')) {
                    link = `https://${link}`;
                }

                response.redirect(link);
            })
            .catch(error => response.status(400).json({
                error: error.message
            }));
    }
}
