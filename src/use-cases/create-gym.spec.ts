import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'
let gymRepository: InMemoryGymsRepository

let sut: CreateGymUseCase
describe('Gym Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymRepository) // SUT System Under Test
  })
  it('should be able to register', async () => {
    const { gym } = await sut.execute({
      title: 'ivone Lourdes',
      description: 'Academia da dona Vone',
      phone: '51 9978980',
      latitude: -29.6761905,
      longitude: -51.0693267,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
