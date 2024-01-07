import { expect, test } from 'vitest'
import { randomString } from '../utils/random-string-generate'

import { Link } from './link'

test('create an link entity', () => {
    const generatedString = randomString(12)

    const link = new Link({
        id: 'random-id',
        url: 'https://www.google.com',
        endpoint: generatedString,
        createdAt: new Date(),
        updatedAt: new Date()
    })

    expect(link).toBeInstanceOf(Link)
    
    expect(link.url).toBe('https://www.google.com')

    expect(link.endpoint).toBe(generatedString)
})
