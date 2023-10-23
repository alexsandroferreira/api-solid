import { FeatchNearByUseCase } from '../featch-nearby-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FeatchNearByUseCase(gymsRepository)

  return useCase
}
