import dotenv from "dotenv";
import { defineConfig } from "prisma/config";
import { withAppSchema } from "./src/lib/db-url";

// Load env for the Prisma CLI (migrate/seed run outside Next.js).
dotenv.config({ path: ".env" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Isolate this app in its own Postgres schema so it never touches other
    // data living in the shared database's `public` schema.
    url: withAppSchema(process.env.DATABASE_URL!),
  },
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
});
