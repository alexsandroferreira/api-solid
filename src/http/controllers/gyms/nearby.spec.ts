import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-use'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    app.close()
  })
  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'ivone Lourdes',
        description: 'Academia da dona Vone',
        phone: '51 99978980',
        latitude: -29.769632,
        longitude: -51.1490784,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'João Ferreira',
        description: 'Academia da Seu João',
        phone: '51 999066272',
        latitude: -29.580136,
        longitude: -51.087212,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({ latitude: -29.769632, longitude: -51.1490784 })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'ivone Lourdes',
      }),
    ])
  })
})
