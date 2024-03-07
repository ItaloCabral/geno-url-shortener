import { LinkRepository } from "src/repositories/link-repository";

type ListShortLinksRequest = {
    userId: string;
}

export class ListShortLinks {
    constructor(
        private readonly linkRepository: LinkRepository
    ) { }
    
    async execute({ userId }: ListShortLinksRequest): Promise<string> {
        if(!userId) throw new Error('User not provided');

        const link = await this.linkRepository.find({ userId });

        if(!link) throw new Error('Link not found');

        return link.url ?? '';
    }
}