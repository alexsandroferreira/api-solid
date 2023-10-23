import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

export async function search(req: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuery = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymsQuery.parse(req.query)

  const createGymUseCase = makeSearchGymsUseCase()

  const { gyms } = await createGymUseCase.execute({
    query,
    page,
  })

  return reply.status(200).send({
    gyms,
  })
}
