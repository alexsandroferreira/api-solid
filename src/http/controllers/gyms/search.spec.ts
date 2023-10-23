import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-use'

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    app.close()
  })
  it('should be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'ivone 55',
        description: 'Academia da dona Vone',
        phone: '51 99978980',
        latitude: -29.6761905,
        longitude: -51.0693267,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'João Ferreira',
        description: 'Academia da Seu João',
        phone: '51 999066272',
        latitude: -29.7116285,
        longitude: -51.166561,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({ query: 'João Ferreira' })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'João Ferreira',
      }),
    ])
  })
})
