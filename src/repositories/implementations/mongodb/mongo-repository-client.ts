import { MongoClient, Collection } from 'mongodb'
import { Link } from 'src/entities/link'

export class MongoRepositoryClient {
  public client: MongoClient | null = null
  private uri: string = ''

  constructor(uri: string) {
    this.uri = uri
  }

  async connect(): Promise<void> {
    this.client = await MongoClient.connect(this.uri)
  }

  async disconnect(): Promise<void> {
    if (!this.client) {
      return
    }
    await this.client.close()
    this.client = null
  }

  async getCollection(name: string): Promise<Collection<Link>> {
    if(!this.client) throw new Error('MongoClient is not connected');

    return this.client.db().collection(name)
  }

  static map(data: any): any {
    const { _id, ...rest } = data
    return Object.assign({}, rest, { id: _id })
  }

  mapCollection(collection: any[]): any[]{
    return collection.map(c => MongoRepositoryClient.map(c))
  }
}