import type { Prisma, User } from '@prisma/client'
import { prisma } from '~/prisma/prismaClient'

export const userRepository = {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({
      data
    })
  },
  async findMany(): Promise<User[]> {
    return prisma.user.findMany({
      orderBy: { id: 'asc' }
    })
  },
  async findUnique(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id }
    })
  },
  async update({
    id,
    data
  }: {
    id: string
    data: Prisma.UserUpdateInput
  }): Promise<User> {
    return prisma.user.update({
      where: { id },
      data
    })
  },
  async delete(id: string): Promise<User> {
    return prisma.user.delete({
      where: { id }
    })
  }
}
