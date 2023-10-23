import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FeatchNearByUseCase } from './featch-nearby-gyms'

let gymRepository: InMemoryGymsRepository
let sut: FeatchNearByUseCase

describe('Featch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new FeatchNearByUseCase(gymRepository) // SUT System Under Test
  })
  it('should be able to featch nearby gyms', async () => {
    await gymRepository.create({
      title: 'Near Gym Usina do corpo sl',
      description: 'teste de busca por query title',
      phone: '51 9978980',
      latitude: -29.769632,
      longitude: -51.1490784,
    })

    await gymRepository.create({
      title: 'Far Gym Usina do corpo DI',
      description: 'teste de busca por query title',
      phone: '51 9978980',
      latitude: -29.580136,
      longitude: -51.087212,
    })
    const { gyms } = await sut.execute({
      userLatitude: -29.711953,
      userLongitude: -51.166464,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Near Gym Usina do corpo sl' }),
    ])
  })
})
