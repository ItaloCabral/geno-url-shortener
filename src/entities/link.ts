type LinkAttributes = {
    id: string;
    url: string;
    endpoint: string;
    createdAt: Date;
    updatedAt: Date;
}

export class Link {
    
    private attrs: LinkAttributes

    constructor(attrs: LinkAttributes) {
        this.attrs = attrs;
    }

    get url() {
        return this.attrs.url;
    }

    get endpoint() {
        return this.attrs.endpoint;
    }

    get createdAt() {
        return this.attrs.createdAt;
    }

    get updatedAt() {
        return this.attrs.updatedAt;
    }

}