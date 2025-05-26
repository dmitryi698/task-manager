import { taskSchema, type Task } from "../schema";
import { prisma } from "../../../server/lib";

export async function createTask(taskData: Omit<Task, "id">) {
  const validatedData = taskSchema.parse(taskData);
  return await prisma.task.create({
    data: validatedData,
  });
}

export async function getTasks() {
  return await prisma.task.findMany({
    orderBy: {
      dueDate: "asc",
    },
  });
}

export async function getTaskById(id: string) {
  return await prisma.task.findUnique({
    where: { id },
  });
}

export async function updateTask(id: string, taskData: Partial<Task>) {
  const validatedData = taskSchema.partial().parse(taskData);
  return await prisma.task.update({
    where: { id },
    data: validatedData,
  });
}

export async function deleteTask(id: string) {
  return await prisma.task.delete({
    where: { id },
  });
}
