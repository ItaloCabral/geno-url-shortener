import { test, expect } from 'vitest'
import { randomString } from '../../utils/random-string-generate';

test('create a random string', () => {

    const length = 10;

    const generated = randomString(length);

    expect(generated.length).toBe(length);
});

test('length cannot be less than 0 or more than 32', () => {
    
        expect(() => randomString(-1)).toThrow();
    
        expect(() => randomString(33)).toThrow();
})

test('length must be an integer', () => expect(() => randomString(1.5)).toThrow())

test('length of 0 returns an empty string', () => expect(randomString(0)).toBe(''))