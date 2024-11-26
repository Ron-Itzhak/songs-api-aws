import { Pool } from "pg";

export const songs_db_pool_local = new Pool({
  user: "postgres",
  password: "Aa123456!",
  host: "postgres",
  port: 5432,
  database: "songs_db",
});
export const songs_db_pool = new Pool({
  user: "songsdb_zgq8_user",
  password: "DmJ1CAYqXgh9mQjtuBhmHkHYJGgVdUAV",
  host: "dpg-cqdtkfpu0jms7390r3ug-a.frankfurt-postgres.render.com",
  port: 5432,
  database: "songsdb_zgq8",
  ssl: true,
});
