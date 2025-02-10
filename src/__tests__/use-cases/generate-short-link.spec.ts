import { describe, expect, it } from 'vitest';

import { GenerateShortLink } from '../../use-cases/generate-short-link';
import { InMemoryLinkRepository } from '../../repositories/implementations/in-memory-link-repository';

describe('generate short link use case', async () => {

    const makeSut = () => {
        const linkRepository = new InMemoryLinkRepository();

        const generateShortLink = new GenerateShortLink(linkRepository);

        return {
            generateShortLink
        }
    }

    it('should generate a short link', async () => {
        const { generateShortLink } = makeSut();

        expect(generateShortLink.execute({
            userId: 'random-user-id',
            url: 'https://www.google.com'
        })).resolves.toEqual({
            url: 'https://www.google.com',
            endpoint: expect.any(String)
        });
    });

    it('should return existent link if already exists', async () => {
        const { generateShortLink } = makeSut();

        const original = await generateShortLink.execute({
            userId: 'random-user-id',
            url: 'https://www.google.com'
        });

        const duplicated = await generateShortLink.execute({
            userId: 'random-user-id',
            url: 'https://www.google.com'
        })

        expect(duplicated.endpoint).toBe(original.endpoint);
    });

})
