import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient({
  datasourceUrl: import.meta.env.DATABASE_URL,
});

export { prisma };
