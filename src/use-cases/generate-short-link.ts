import { LinkRepository } from 'src/repositories/link-repository';
import { Link } from '../entities/link';

type GenerateShortLinkRequest = {
    userId: string;
    url: string;
}

type GenerateShortLinkResponse = {
    endpoint: string;
};

export class GenerateShortLink {

    constructor(
        private readonly linkRepository: LinkRepository
    ) { }


    async execute({ userId, url }: GenerateShortLinkRequest): Promise<GenerateShortLinkResponse> {
        const link = new Link({
            url,
            userId,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const linkAlreadyExists = await this.linkRepository.find({ url: link.url });

        if(linkAlreadyExists) throw new Error('Link already exists');

        await this.linkRepository.create(link);

        return {
            endpoint: <string>link.endpoint
        };
    }

}