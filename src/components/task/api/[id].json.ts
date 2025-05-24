import { getTaskById, updateTask, deleteTask } from "../actions";
import { taskSchema } from "../schema";
import { json } from "@sveltejs/kit";

export async function GET({ params }) {
  const task = await getTaskById(params.id);
  if (!task) {
    return json({ error: "Task not found" }, { status: 404 });
  }
  return json(task);
}

export async function PATCH({
  request,
  params,
}: {
  request: Request;
  params: { id: string };
}) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const taskData = {
      ...(data.title && { title: data.title.toString() }),
      ...(data.description && { description: data.description.toString() }),
      ...(data.priority && { priority: data.priority.toString() }),
      ...(data.dueDate && { dueDate: data.dueDate.toString() }),
      ...(data.completed !== undefined && {
        completed: data.completed === "true",
      }),
    };

    const validatedData = taskSchema.partial().parse(taskData);
    const task = await updateTask(params.id, validatedData);

    return json(task);
  } catch (error) {
    return json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE({ params }: { params: { id: string } }) {
  try {
    await deleteTask(params.id);
    return json({ success: true });
  } catch (error) {
    return json({ error: error.message }, { status: 400 });
  }
}
