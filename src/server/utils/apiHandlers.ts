import type { APIRoute } from "astro";

const apiHandler = (handler: APIRoute): APIRoute => {
  return async (ctx) => {
    try {
      return await handler(ctx);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : String(error) || "Unknown error";
      return new Response(JSON.stringify({ error: message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  };
};

const errorHandler = (error: unknown) => {
  if (error == null) {
    return "unknown error";
  }

  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return JSON.stringify(error);
};

export { apiHandler, errorHandler };
