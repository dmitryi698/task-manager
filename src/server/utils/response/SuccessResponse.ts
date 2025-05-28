export default class SuccessResponse {
  static create(data: any, status = 200): Response {
    return new Response(JSON.stringify(data), {
      status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
