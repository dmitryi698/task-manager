import type { APIRoute } from "astro";

export const apiHandler = (handler: APIRoute): APIRoute => {
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
