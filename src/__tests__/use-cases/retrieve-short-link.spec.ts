import { describe, it, expect } from 'vitest'

import { InMemoryLinkRepository } from '../../repositories/implementations/in-memory-link-repository'
import { RetrieveShortLink } from '../../use-cases/retrieve-short-link'
import { GenerateShortLink } from '../../use-cases/generate-short-link'

describe('Retrieve short link', () => {
    const makeSut = () => {
        const linkRepository = new InMemoryLinkRepository()

        const generateShortLink = new GenerateShortLink(linkRepository)
        const retrieveShortLink = new RetrieveShortLink(linkRepository)

        return {
            generateShortLink,
            retrieveShortLink
        }
    }


    it('should return a short link', async () => {
        const { retrieveShortLink, generateShortLink } = makeSut()

        const generated = await generateShortLink.execute({
            userId: 'random-user-id',
            url: 'https://www.google.com'
        })

        const endpoint = generated.endpoint

        const link = await retrieveShortLink.execute({
            endpoint
        })

        expect(link).toBe(generated.url)
    })

    it('should return an error when the short link does not exist', async () => {
        const { retrieveShortLink, generateShortLink } = makeSut()

        await generateShortLink.execute({
            userId: 'random-user-id',
            url: 'https://www.google.com'
        })

        expect(retrieveShortLink.execute({
            endpoint: 'endpoint'
        })).rejects.toThrowError('Link not found')
    })

    // it('should return an error when the short link is expired', () => {
    //     expect(true).toBe(true)
    // })

    // it('should return an error when the short link is disabled', () => {
    //     expect(true).toBe(true)
    // })
})