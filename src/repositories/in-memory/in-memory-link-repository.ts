import { Link } from "src/entities/link";
import { LinkRepository } from "../link-repository";

export class InMemoryLinkRepository implements LinkRepository {

    public collection: Link[] = []

    has(item: Link): boolean {
        return this.collection.includes(item);
    }

    async create(link: Link): Promise<void> {
        if(this.has(link)) throw new Error('Link already exists');

        this.collection.push(link);
    }

    async update(link: Link): Promise<void> {
        if(!this.has(link)) throw new Error('Link not found');

        const index = this.collection.findIndex(item => item.endpoint === link.endpoint);

        this.collection[index] = link;
    }

    async find(queryObject: Partial<Link>): Promise<Link | undefined> {
        return this.collection.find(item => {
            const keys = Object.keys(queryObject);

            return keys.every(key => item[key] === queryObject[key]);
        });
    }
}