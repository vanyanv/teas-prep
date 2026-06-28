import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { APP_SCHEMA, stripSslMode, toDirectConnection } from "@/lib/db-url";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL is required");
  // Pass the schema to the adapter (not via a search_path startup param —
  // Neon's pooled connection rejects that). Prisma then emits schema-qualified
  // SQL, so this app only ever touches the `teas_prep` schema.
  const adapter = new PrismaPg(
    {
      connectionString: toDirectConnection(stripSslMode(databaseUrl)),
      ssl: true,
    },
    { schema: APP_SCHEMA },
  );
  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
