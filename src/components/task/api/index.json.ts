import { getTasks, createTask } from "../../../actions/taskActions";
import { taskSchema } from "../../../lib/task";
import { json } from "@sveltejs/kit";

export async function GET() {
  const tasks = await getTasks();
  return json(tasks);
}

export async function POST({ request }) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    if (data._method === "PATCH") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
      });
    }

    const taskData = {
      title: data.title.toString(),
      description: data.description.toString(),
      priority: data.priority.toString(),
      dueDate: data.dueDate.toString(),
      completed: data.completed === "true",
    };

    const validatedData = taskSchema.parse(taskData);
    const task = await createTask(validatedData);

    return json(task, { status: 201 });
  } catch (error) {
    return json({ error: error.message }, { status: 400 });
  }
}
