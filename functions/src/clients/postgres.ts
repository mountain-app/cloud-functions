import { Client } from "pg";

const connectionString =
  process.env.DATABASE_URL ||
  "postgres://postgres:postgres@localhost:5432/postgres";

export const pgClient = new Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false, // bad in production
  },
});
