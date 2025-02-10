import { describe, expect, it } from "vitest";
import { InMemoryLinkRepository } from "../../repositories/implementations/in-memory-link-repository";
import { GenerateShortLink } from "../../use-cases/generate-short-link";
import { DeleteShortLink } from "../../use-cases/delete-short-link";
import { ListShortLinks } from "../../use-cases/list-short-links";

describe('list short links use case', async () => {

    const makeSut = () => {
        const linkRepository = new InMemoryLinkRepository()

        const generateShortLink = new GenerateShortLink(linkRepository);

        const listShortLinks = new ListShortLinks(linkRepository)

        const deleteShortLink = new DeleteShortLink(linkRepository)

        return {
            generateShortLink,
            deleteShortLink,
            listShortLinks
        }
    }

    it('should list an users short links', async () => {

        const { generateShortLink, listShortLinks } = makeSut()

        await generateShortLink.execute({
            userId: 'random-user-id',
            url: 'https://www.google.com'
        });

        await generateShortLink.execute({
            userId: 'random-user-id',
            url: 'https://www.github.com'
        });

        await generateShortLink.execute({
            userId: 'random-user-id',
            url: 'https://www.linkedin.com'
        });

        const links = await listShortLinks.execute({
            userId: 'random-user-id'
        });

        expect(links).toHaveLength(3)

        expect(links[0].attrs.url).toBe('https://www.google.com')

        expect(links[1].attrs.url).toBe('https://www.github.com')

        expect(links[2].attrs.url).toBe('https://www.linkedin.com')

    })

    it('should return an empty array when user has no links', async () => {
        const { listShortLinks } = makeSut()

        const links = await listShortLinks.execute({
            userId: 'random-user-id-no-links'
        });

        expect(links).toHaveLength(0)
    })

    it('should return just the non-deleted links', async () => {
        const { generateShortLink, listShortLinks, deleteShortLink } = makeSut()

        await generateShortLink.execute({
            userId: 'random-user-id',
            url: 'https://www.google.com'
        });

        await generateShortLink.execute({
            userId: 'random-user-id',
            url: 'https://www.github.com'
        });

        await generateShortLink.execute({
            userId: 'random-user-id',
            url: 'https://www.linkedin.com'
        });

        const links = await listShortLinks.execute({
            userId: 'random-user-id'
        });

        expect(links).toHaveLength(3)

        await deleteShortLink.execute({
            userId: 'random-user-id',
            endpoint: links[0].attrs.endpoint
        });

        const linksAfterDelete = await listShortLinks.execute({
            userId: 'random-user-id'
        });

        expect(linksAfterDelete).toHaveLength(2)
    })

});