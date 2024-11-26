import { Pool } from "pg";

export const songs_db_pool = new Pool({
  user: "postgres",
  password: "Aa123456!",
  host: "postgres",
  port: 5432,
  database: "songs_db",
});
