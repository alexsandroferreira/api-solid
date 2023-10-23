import { IUsersRepository } from '@/repositories/interfaces/Iusers-repository'
import { hash } from 'bcryptjs'
import { UserAlereadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'
interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}
export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByDate(email)

    if (userWithSameEmail) {
      throw new UserAlereadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
