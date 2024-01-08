import { LinkRepository } from "src/repositories/link-repository";

type RetrieveShortLinkRequest = {
    endpoint: string;
}

export class RetrieveShortLink {
    constructor(
        private readonly linkRepository: LinkRepository
    ) { }
    
    async execute({ endpoint }: RetrieveShortLinkRequest): Promise<string | undefined> {
        const link = await this.linkRepository.find({ endpoint });
        
        if(!link) throw new Error('Link not found');

        return link.url;
    }
}