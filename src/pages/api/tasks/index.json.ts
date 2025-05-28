import { prisma } from "../../../server/lib/prisma";
import { apiHandler } from "../../../server/utils";
import SuccessResponse from "../../../server/utils/response/SuccessResponse";
import TaskUsecase from "../../../components/task/usecases/TaskUsecase";
const usecase = new TaskUsecase(prisma);

export const GET = apiHandler(async () => {
  const tasks = await usecase.getAll();
  return SuccessResponse.create(tasks);
});

export const POST = apiHandler(async ({ request }) => {
  const data = await request.json();
  const task = await usecase.create(data);
  return SuccessResponse.create(task, 201);
});
