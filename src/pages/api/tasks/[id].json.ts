import { prisma } from "../../../server/lib/prisma";
import { apiHandler } from "../../../server/utils";
import ErrorResponse from "../../../server/utils/response/ErrorResponse";
import SuccessResponse from "../../../server/utils/response/SuccessResponse";
import TaskUsecase from "../../../components/task/usecases/TaskUsecase";
import type { APIContext } from "astro";
const usecase = new TaskUsecase(prisma);

export const GET = apiHandler(async ({ params }: APIContext) => {
  if (!params.id) {
    return ErrorResponse.create("Task id is required", 400);
  }
  const task = await usecase.getById(params.id);

  if (!task) {
    return ErrorResponse.create("Task not found", 404);
  }

  return SuccessResponse.create(task);
});

export const PUT = apiHandler(async ({ params, request }: APIContext) => {
  if (!params.id) {
    return ErrorResponse.create("Task id is required", 400);
  }
  const data = await request.json();
  const task = await usecase.update(params.id, data);
  return SuccessResponse.create(task);
});

export const DELETE = apiHandler(async ({ params }: APIContext) => {
  if (!params.id) {
    return ErrorResponse.create("Task id is required", 400);
  }
  const task = await usecase.delete(params.id);
  return SuccessResponse.create(task);
});
