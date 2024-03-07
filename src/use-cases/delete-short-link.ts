import {LinkRepository} from "../repositories/link-repository";

type DeleteShortLinkRequest = {
    userId: string;
    endpoint: string;
}

type DeleteShortLinkResponse = {
    message: string;
}

export class DeleteShortLink {

    constructor(
        private readonly linkRepository: LinkRepository
    ) {
    }

    async execute({
        userId,
        endpoint
    }: DeleteShortLinkRequest): Promise<DeleteShortLinkResponse> {

            const link = await this.linkRepository.find({userId, endpoint});

            if (!link) return {message: 'Link not found'};

            if(!this.linkRepository.delete(<string>link.id)) {
                return {message: 'Link not found'};
            }

            return { message: 'Link deleted successfully' };

    }

}
