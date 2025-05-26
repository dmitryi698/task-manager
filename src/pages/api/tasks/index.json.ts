import { prisma } from "../../../lib/prisma";
import type { APIRoute } from "astro";
import { taskSchema } from "../../../components/task/schema";

export const GET: APIRoute = async () => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { dueDate: "asc" },
    });
    return new Response(JSON.stringify(tasks), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch tasks" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    console.log({ data });
    const validatedData = taskSchema.parse(data);

    const task = await prisma.task.create({
      data: validatedData,
    });

    return new Response(JSON.stringify(task), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || "Invalid data" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
