import type { Prisma, Todo } from '@prisma/client'
import { prisma } from '~/prisma/prismaClient'

export const todoRepository = {
  async create(data: Prisma.TodoCreateInput): Promise<Todo> {
    return prisma.todo.create({
      data
    })
  },
  async findMany(): Promise<Todo[]> {
    return prisma.todo.findMany({
      orderBy: { createdAt: 'desc' }
    })
  },
  async findUnique(id: string): Promise<Todo | null> {
    return prisma.todo.findUnique({
      where: { id }
    })
  },
  async update({
    id,
    data
  }: {
    id: string
    data: Prisma.TodoUpdateInput
  }): Promise<Todo> {
    return prisma.todo.update({
      where: { id },
      data
    })
  },
  async delete(id: string): Promise<Todo> {
    return prisma.todo.delete({
      where: { id }
    })
  }
}
