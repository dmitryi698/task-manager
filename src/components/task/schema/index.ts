import { z } from "zod";

export const taskSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  dueDate: z.string().transform((val) => new Date(val)),
  completed: z.boolean().default(false),
});

export type Task = z.infer<typeof taskSchema>;
