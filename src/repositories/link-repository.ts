import { Link } from "src/entities/link";

export interface LinkRepository {
    create(link: Link): Promise<void>;
    update(link: Link): Promise<void>;
    find(queryObject: Partial<Link>): Promise<Link | undefined>;
}