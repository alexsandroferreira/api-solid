import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './checkIn'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'

let checkInRepository: InMemoryCheckInsRepository
let gymRepository: InMemoryGymsRepository
let sut: CheckInUseCase
describe('Check-in Profile Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInRepository, gymRepository)

    await gymRepository.create({
      id: 'gym-01',
      title: 'Test academia IVone',
      description: 'description',
      latitude: -29.716945,
      longitude: -51.160355,
      phone: '051 998010190',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -29.716945,
      userLongitude: -51.160355,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 9, 4, 6, 15, 15))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -29.716945,
      userLongitude: -51.160355,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -29.716945,
        userLongitude: -51.160355,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check but in twice diferrent days', async () => {
    vi.setSystemTime(new Date(2022, 9, 4, 6, 15, 15))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -29.716945,
      userLongitude: -51.160355,
    })

    vi.setSystemTime(new Date(2022, 9, 7, 6, 15, 15))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -29.716945,
      userLongitude: -51.160355,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should  not be able to check in on distant gym', async () => {
    await gymRepository.create({
      id: 'gym-02',
      title: 'Test academia 02',
      description: 'description',
      latitude: -29.6761905,
      longitude: 51.0693267,
      phone: '051 998020190',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -29.6784276,
        userLongitude: -51.1064484,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })
})
