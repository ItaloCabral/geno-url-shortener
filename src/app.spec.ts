import { it, expect, describe } from 'vitest'
import supertest from 'supertest'

import App from './app'

const app = App

const requestWithSupertest = supertest(app)

describe('Debug endpoints', () => {
    it('GET /debug should return a message', async () => {
        const response = await requestWithSupertest.get('/debug')
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ message: 'Up and running!' })
    })

})
