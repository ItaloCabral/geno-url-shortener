import { LinkRepository } from 'src/repositories/link-repository';
import { Link } from '../entities/link';

type GenerateShortLinkRequest = {
    userId?: string | null;
    url: string;
}

type GenerateShortLinkResponse = {
    endpoint: string;
};

export class GenerateShortLink {

    constructor(
        private readonly linkRepository: LinkRepository
    ) { }

    /**
     * TODO: Implement expiration date for links
     */

    async execute({ userId, url }: GenerateShortLinkRequest): Promise<GenerateShortLinkResponse> {
        
        const linkAlreadyExists = await this.linkRepository.find({ url, userId: userId ?? undefined});
        
        if(!!linkAlreadyExists
           || (userId && await this.linkRepository.find({ url, userId }))
        ) return {
            endpoint: <string>linkAlreadyExists?.endpoint
        }

        const link = new Link({
            url,
            userId: userId ?? undefined
        });

        await this.linkRepository.create(link);

        return {
            endpoint: <string>link.endpoint
        };
    }

}