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
            endpoint: expect.any(String)
        });
    });

    it('should throw an error if link already exists', async () => {
        const { generateShortLink } = makeSut();

        await generateShortLink.execute({
            userId: 'random-user-id',
            url: 'https://www.google.com'
        });

        expect(generateShortLink.execute({
            userId: 'random-user-id',
            url: 'https://www.google.com'
        })).rejects.toThrowError('Link already exists');
    });

})
