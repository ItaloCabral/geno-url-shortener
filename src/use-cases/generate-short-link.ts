import { LinkRepository } from 'src/repositories/link-repository';
import { Link } from '../entities/link';
import { randomString } from '../utils/random-string-generate';

type GenerateShortLinkRequest = {
    userId?: string | null;
    url: string;
}

type GenerateShortLinkResponse = {
    endpoint: string;
    url: string;
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
            url: <string>linkAlreadyExists?.url,
            endpoint: <string>linkAlreadyExists?.endpoint
        }

        const endpoint = await this.getEndpoint(12);

        console.log('endpoint', endpoint);

        const link = new Link({
            endpoint,
            url,
            userId: userId ?? undefined
        });

        await this.linkRepository.create(link);

        return {
            url: <string>link.url,
            endpoint: <string>link.endpoint
        };
    }

    private async getEndpoint(initialLength: number): Promise<string> {
        let endpoint = randomString(initialLength);

        if (!!(await this.linkRepository.find({ endpoint }))) return randomString(initialLength + 1);

        return endpoint;
    }
}