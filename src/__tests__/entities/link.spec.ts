import { expect, test } from 'vitest'
import { randomString } from '../../utils/random-string-generate'

import { Link } from '../../entities/link'

test('create an link entity', () => {
    const generatedString = randomString(12)

    const link = new Link({
        url: 'https://www.google.com',
        endpoint: generatedString,
        userId: 'random-user-id',
        createdAt: new Date(),
        updatedAt: new Date()
    })

    expect(link).toBeInstanceOf(Link)
    
    expect(link.url).toBe('https://www.google.com')

    expect(link.endpoint).toBe(generatedString)

    expect(link.userId).toBe('random-user-id')
})

test('should throw an error when url is missing', () => {
    const generatedString = randomString(12)

    expect(() => {
        new Link({
            url: '',
            endpoint: generatedString,
            userId: 'random-user-id',
            createdAt: new Date(),
            updatedAt: new Date()
        })
    }).toThrow('missing url')
})

test('should throw an error when endpoint is missing', () => {
    expect(() => {
        new Link({
            url: 'https://www.google.com',
            endpoint: '',
            userId: 'random-user-id',
            createdAt: new Date(),
            updatedAt: new Date()
        })
    }).toThrow('missing endpoint')
})

test('should throw an error when userId is missing', () => {
    expect(() => {
        new Link({
            url: 'https://www.google.com',
            endpoint: randomString(12),
            userId: '',
            createdAt: new Date(),
            updatedAt: new Date()
        })
    }).toThrow('missing userId')
})
