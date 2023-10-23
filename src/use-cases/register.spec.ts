import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { RegisterUseCase } from '@/use-cases/register'
import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { UserAlereadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase
describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository) // SUT System Under Test
  })
  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'ivone Lourdes',
      email: 'ivone01@gmail.com',
      password: '123456ilv',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'ivone Lourdes',
      email: 'ivone01@gmail.com',
      password: '123456ilv',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456ilv',
      user.password_hash,
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with sama email twice', async () => {
    const email = 'ivone01@gmail.com'
    await sut.execute({
      name: 'ivone Lourdes',
      email,
      password: '123456ilv',
    })

    await expect(() =>
      sut.execute({
        name: 'ivone Lourdes',
        email,
        password: '123456ilv',
      }),
    ).rejects.toBeInstanceOf(UserAlereadyExistsError)
  })
})
