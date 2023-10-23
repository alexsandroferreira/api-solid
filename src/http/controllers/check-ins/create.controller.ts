import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCheckInsUseCase } from '@/use-cases/factories/make-check-in-use-case'

export async function createCheckIns(req: FastifyRequest, reply: FastifyReply) {
  const createCheckInsParamsSchema = z.object({
    gymId: z.string().uuid(),
  })
  const createCheckInsBodySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = createCheckInsParamsSchema.parse(req.params)
  const { latitude, longitude } = createCheckInsBodySchema.parse(req.body)

  const createCheckInsUseCase = makeCheckInsUseCase()

  await createCheckInsUseCase.execute({
    userId: req.user.sub,
    gymId,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send()
}
