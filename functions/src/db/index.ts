import { Pool } from "pg";
import { UserService } from "./services/UserService";

const connectionString =
  process.env.DATABASE_URL ||
  "postgres://postgres:postgres@localhost:5432/postgres";

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false, // bad in production
  },
});

export const userService = new UserService(pool);
