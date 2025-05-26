export default class ErrorResponse {
  static create(errorText: string, status = 500): Response {
    return new Response(JSON.stringify(errorText), {
      status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
