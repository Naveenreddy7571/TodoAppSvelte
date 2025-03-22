import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  driver: 'd1-http',
  out: './drizzle',
  schema: './src/db/schema.ts',

  dbCredentials: {
    accountId: '37e567e77879b600cabb2efd99cbf73a',
    databaseId: 'cde09273-7cb8-45fb-b872-880eead295ff',
    token: 'leqb1UuPd20HQCbH2rCsUYF9aPZ8ZmQ965ADJLaO',
  },
});
