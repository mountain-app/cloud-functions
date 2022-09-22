import { ClientConfig, Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL ||
  "postgres://postgres:postgres@localhost:5432/postgres";

export const pgConfig: ClientConfig = {
  connectionString,
  ssl: {
    rejectUnauthorized: false, // bad in production
  },
};

const pool = new Pool(pgConfig);

export default pool;
