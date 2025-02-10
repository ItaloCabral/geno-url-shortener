import { Link } from "src/entities/link";
import { LinkRepository } from "src/repositories/link-repository";

type ListShortLinksRequest = {
    userId: string;
}

export class ListShortLinks {
    constructor(
        private readonly linkRepository: LinkRepository
    ) { }
    
    async execute({ userId }: ListShortLinksRequest): Promise<Partial<Link>[]> {
        if(!userId) throw new Error('User not provided');

        const links = await this.linkRepository.list(userId);

        return links;
    }
}