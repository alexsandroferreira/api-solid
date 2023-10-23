import { Prisma, User } from '@prisma/client'

export interface IUsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>

  findByDate(data: string): Promise<User | null>

  findById(data: string): Promise<User | null>
}
