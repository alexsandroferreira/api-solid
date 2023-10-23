import { Gym, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface IGymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>

  findById(data: string): Promise<Gym | null>

  findManyNearBy(params: FindManyNearbyParams): Promise<Gym[]>

  searchMany(query: string, page: number): Promise<Gym[]>
}
