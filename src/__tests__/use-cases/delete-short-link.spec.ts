import {describe, expect, it} from "vitest";
import {InMemoryLinkRepository} from "../../repositories/implementations/in-memory-link-repository";
import {GenerateShortLink} from "../../use-cases/generate-short-link";
import {DeleteShortLink} from "../../use-cases/delete-short-link";

describe('delete short link use case', async () => {

    const makeSut = () => {
        const linkRepository = new InMemoryLinkRepository()

        const generateShortLink = new GenerateShortLink(linkRepository);

        const deleteShortLink = new DeleteShortLink(linkRepository)

        return {
            generateShortLink,
            deleteShortLink
        }
    }

    it('should delete a short link', async () => {
        const {
            generateShortLink,
            deleteShortLink
        } = makeSut()

        const { endpoint } = await generateShortLink.execute({
            userId: 'random-user-id',
            url: 'https://www.google.com'
        })

        expect(deleteShortLink.execute({
            userId: 'random-user-id',
            endpoint
        })).resolves.toEqual({message: 'Link deleted successfully'})
    })

    it('should throw an error if link not found', async () => {
        const { deleteShortLink } = makeSut()

        expect(deleteShortLink.execute({
            userId: 'non-existing-user-id',
            endpoint: 'not-random-endpoint'
        })).resolves.toEqual({message: 'Link not found'})

    })

})