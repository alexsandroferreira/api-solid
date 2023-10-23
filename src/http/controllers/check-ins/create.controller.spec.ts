import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-use'
import { prisma } from '@/lib/prisma'

describe('create check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    app.close()
  })
  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'Academia dona Ivone',
        description: 'Dona Ivone maronba LTDA',
        latitude: -29.6761905,
        longitude: -51.0693267,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -29.6761905,
        longitude: -51.0693267,
      })

    expect(response.statusCode).toEqual(201)
  })
})
