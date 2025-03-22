import { drizzle } from 'drizzle-orm/d1';
import { todos } from './schema';

export const initDbConnect = (env: D1Database) => {
  return drizzle(env, { schema: { todos } });
};