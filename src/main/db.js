import { Client } from 'pg';

export default async () => {
  const client = new Client({
    user: 'postgres',
    password: '12345678',
    host: 'localhost',
    port: '5432',
    database: 'postgres',
  });

  await client.connect();
  return client;
};
