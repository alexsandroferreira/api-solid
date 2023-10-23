import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Refresh (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    app.close()
  })
  it('should be able to refresh a token', async () => {
    await request(app.server).post('/users').send({
      name: 'Ivone Viegas',
      email: 'IvoneViegas@gmail.com',
      password: '1122334455',
    })
    const authResponse = await request(app.server).post('/sessions').send({
      email: 'IvoneViegas@gmail.com',
      password: '1122334455',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)

    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
