import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gym Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymRepository) // SUT System Under Test
  })
  it('should be able searche Gym from query', async () => {
    await gymRepository.create({
      title: 'Ivone academia',
      description: 'teste de busca por query title',
      phone: '51 9978980',
      latitude: -29.6761905,
      longitude: -51.0693267,
    })

    await gymRepository.create({
      title: 'Joao academia',
      description: 'teste de busca por query title',
      phone: '51 9978980',
      latitude: -29.6761905,
      longitude: -51.0693267,
    })
    const { gyms } = await sut.execute({ query: 'Ivone academia', page: 1 })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Ivone academia' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `Ivone academia Gym:-${i}`,
        description: `teste de busca por query title-${i}`,
        phone: '51 9978980',
        latitude: -29.6761905,
        longitude: -51.0693267,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Ivone academia',
      page: 2,
    })
    console.log(gyms)

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: `Ivone academia Gym:-21` }),
      expect.objectContaining({ title: `Ivone academia Gym:-22` }),
    ])
  })
})
