import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { errorHandler } from "../../../server/utils/apiHandlers";

const openai = createOpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY,
});

export async function POST({ request }: { request: Request }) {
  const { messages, model } = await request.json();

  const result = streamText({
    model: openai(model),
    messages,
  });
  return result.toDataStreamResponse({
    getErrorMessage: errorHandler,
  });
}
