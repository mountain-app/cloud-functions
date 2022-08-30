import { Pool } from "pg";

const pool = new Pool({
  //   user: process.env.DATABASE_USER || "postgres",
  //   password: process.env.DATABASE_PASSWORD || "postgres",
  //   host: process.env.DATABASE_HOST || "localhost",
  //   database: process.env.DATABASE_NAME || "postgres",
  //   port: +(process.env.DATABASE_PORT || 5432),
  connectionString: process.env.DATABASE_URL || "replace-with-docker-compose",
  ssl: {
    rejectUnauthorized: false, // bad in production
  },
});

export default pool;
