import { v4 as uuid } from 'uuid';

/**
 * TODO: Implement expiration date for links
 * TODO: Implement custom endpoint for links
 * TODO: Implement custom alias for links
 * TODO: Implement disable link
 */

type LinkAttributes = {
    id?: string;
    url: string;
    endpoint: string;
    userId: string;
    createdAt: Date;
    updatedAt?: Date;
}

export class Link {
    
    private attrs: LinkAttributes

    constructor(attrs: LinkAttributes) {

        const { url, endpoint, userId } = attrs;

        attrs.id = uuid();

        if (!url) {
            throw new Error('missing url');
        }

        if (!endpoint) {
            throw new Error('missing endpoint');
        }

        if (!userId) {
            throw new Error('missing userId');
        }

        this.attrs = attrs;
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