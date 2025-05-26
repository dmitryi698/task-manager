import { prisma } from "../../../lib/prisma";
import type { APIRoute } from "astro";
import { taskSchema } from "../../../components/task/schema";

export const GET: APIRoute = async ({ params }) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: params.id },
    });

    if (!task) {
      return new Response(JSON.stringify({ error: "Task not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify(task), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch task" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const data = await request.json();
    const validatedData = taskSchema.partial().parse(data);

    const task = await prisma.task.update({
      where: { id: params.id },
      data: validatedData,
    });

    return new Response(JSON.stringify(task), {
      status: 200,
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

export const DELETE: APIRoute = async ({ params }) => {
  try {
    await prisma.task.delete({
      where: { id: params.id },
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete task" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
