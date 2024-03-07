import { randomUUID } from "node:crypto";
import {randomString} from "../utils/random-string-generate";

/**
 * TODO: Implement expiration date for links
 * TODO: Implement custom endpoint for links
 * TODO: Implement custom alias for links
 * TODO: Implement disable link
 */

type LinkAttributes = {
    id?: string;
    url: string;
    endpoint?: string;
    userId: string;
    createdAt: Date;
    updatedAt?: Date;
}

export class Link {
    
    private attrs: LinkAttributes

    constructor(attrs: LinkAttributes) {

        if (!attrs.url) throw new Error('missing url');

        if (!attrs.userId) throw new Error('missing userId');

        this.attrs = {
            ...attrs,
            id: randomUUID(),
            endpoint: randomString(12)
        };
    }

    get id() {
        return this.attrs.id;
    }

    get url() {
        return this.attrs.url;
    }

    get endpoint() {
        return this.attrs.endpoint;
    }

    get userId() {
        return this.attrs.userId;
    }

    get createdAt() {
        return this.attrs.createdAt;
    }

    get updatedAt() {
        return this.attrs.updatedAt;
    }

}