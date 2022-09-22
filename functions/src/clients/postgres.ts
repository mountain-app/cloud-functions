import { ClientConfig } from "pg";

const connectionString =
  process.env.DATABASE_URL ||
  "postgres://postgres:postgres@localhost:5432/postgres";

export const pgClientConfig: ClientConfig = {
  connectionString,
  ssl: {
    rejectUnauthorized: false, // bad in production
  },
};
