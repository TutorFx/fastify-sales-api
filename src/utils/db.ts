import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
  max: 10,
  idleTimeoutMillis: 30000,
};

export default () => new pg.Pool(config);