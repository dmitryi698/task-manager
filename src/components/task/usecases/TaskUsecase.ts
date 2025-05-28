import type { PrismaClient } from "../../../generated/prisma";
import { taskSchema, type Task } from "../schema";

export default class TaskUsecase {
  private prisma;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getAll() {
    return await this.prisma.task.findMany({
      orderBy: {
        dueDate: "asc",
      },
    });
  }

  async getById(id: string) {
    return await this.prisma.task.findUnique({
      where: { id },
    });
  }

  async create(taskData: Partial<Task>) {
    const validatedData = taskSchema.parse(taskData);

    return await this.prisma.task.create({
      data: validatedData,
    });
  }

  async update(id: string, taskData: Partial<Task>) {
    const validatedData = taskSchema.partial().parse(taskData);
    return await this.prisma.task.update({
      where: { id },
      data: validatedData,
    });
  }

  async delete(id: string) {
    return await this.prisma.task.delete({
      where: { id },
    });
  }
}
