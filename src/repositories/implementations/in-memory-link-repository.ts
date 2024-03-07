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
            // @ts-ignore
            return keys.every(key => queryObject[key] === item[key]);
        });
    }

    async delete(id: string): Promise<boolean> {

        if (!id) return false;

        const index = this.collection.findIndex(item => item.id === id);

        this.collection.splice(index, 1);

        return true;
    }

    async list(userId: string): Promise<Link[]> {
        return this.collection.filter(item => item.userId === userId);
    }
}