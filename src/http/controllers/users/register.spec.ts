import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    app.close()
  })
  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Ivone Viegas',
      email: 'IvoneViegas@gmail.com',
      password: '1122334455',
    })

    expect(response.statusCode).toEqual(201)
  })
})
