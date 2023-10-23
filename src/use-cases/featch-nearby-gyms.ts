import { Gym } from '@prisma/client'
import { IGymsRepository } from '@/repositories/interfaces/Igyms-repository'

interface FeatchNearByUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FeatchNearByUseCaseResponse {
  gyms: Gym[]
}

export class FeatchNearByUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FeatchNearByUseCaseRequest): Promise<FeatchNearByUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearBy({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
