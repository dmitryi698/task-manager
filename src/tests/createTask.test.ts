import { expect, test } from "vitest";
import { taskSchema } from "../components/task/schema";

test("validates task data", () => {
  const validTask = {
    title: "Test task",
    description: "Test description",
    priority: "medium",
    dueDate: "2023-12-31",
  };

  expect(() => taskSchema.parse(validTask)).not.toThrow();

  const invalidTask = {
    title: "",
    description: "",
    priority: "invalid",
    dueDate: "not-a-date",
  };

  expect(() => taskSchema.parse(invalidTask)).toThrow();
});
