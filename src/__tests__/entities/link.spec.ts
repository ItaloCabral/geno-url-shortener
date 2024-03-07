import { expect, test } from 'vitest'
import { randomString } from '../../utils/random-string-generate'

import { Link } from '../../entities/link'

test('create an link entity', () => {

    const link = new Link({
        url: 'https://www.google.com',
        userId: 'random-user-id',
        createdAt: new Date(),
        updatedAt: new Date()
    })

    expect(link).toBeInstanceOf(Link)
    
    expect(link.url).toBe('https://www.google.com')

    expect(link.userId).toBe('random-user-id')
})

test('should throw an error when url is missing', () => {

    expect(() => {
        new Link({
            url: '',
            userId: 'random-user-id',
            createdAt: new Date(),
            updatedAt: new Date()
        })
    }).toThrow('missing url')
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
