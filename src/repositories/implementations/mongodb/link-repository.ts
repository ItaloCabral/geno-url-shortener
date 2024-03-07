import { Collection } from "mongodb";

import { Link } from "../../../entities/link";

import { LinkRepository } from "../../link-repository";
import { MongoRepositoryClient } from "./mongo-repository-client";

import { env } from "../../../env";

export class MongoDbLinkRepository implements LinkRepository {

    private _client: MongoRepositoryClient | undefined
    private _collection: Collection<Partial<Link>> | undefined

    constructor() {
        this.client = new MongoRepositoryClient(env.MONGODB_URL || 'mongodb://localhost:27017')

        this.run().then(() => {
            console.log('Connected to MongoDB')
        }).catch((err) => {
            console.error(err)
        })
        
    }

    get client() {
        return this._client;
    }

    set client(value) {
        this._client = value;
    }

    get collection(): Collection<Partial<Link>> | undefined {
        return this._collection;
    }

    set collection(value: Collection<Partial<Link>>) {
        this._collection = value;
    }

    async run(): Promise<void> {
        await this.client?.connect()

        if(!this.client) throw new Error('Failed to connect to MongoDB')

        this.collection = await this.client.getCollection('links')
    }

    async create(link: Link): Promise<void> {
        const attributes = link.getAttributes();
        const result = await this.collection?.insertOne(attributes);

        if(!result?.acknowledged) throw new Error('Failed to insert link');
    }

    async delete(id: string): Promise<boolean> {
        if (!id) return false;

        const result = await this.collection?.deleteOne({ id })

        if(!result) throw new Error('Failed to delete link')

        return result.acknowledged
    }

    async find(queryObject: Partial<Link>): Promise<Partial<Link> | null | undefined> {
        const link = await this.collection?.findOne(
            { ...queryObject },
            {
                projection: {
                    _id: 0,
                    url: 1,
                    endpoint: 1
                }
            }
        )

        return link

    }

    async list(userId: string): Promise<Partial<Link>[]> {
        const links = await this.collection?.find({userId}, {
            projection: {
                _id: 0,
                id: 0,
                userId: 0,
            }
        }).sort({createdAt: -1}).toArray()

        if(!links) return []

        return links.map(link => ({
                ...link,
            })
        )
    }

    async update(link: Link): Promise<void> {
        const result = await this.collection?.updateOne({ id: link.id },
            {
                $set: { ...link }
            }
        )

        if (!result?.acknowledged) throw new Error('Failed to update link')
    }
}