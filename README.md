steps:
- run `docker compose up -d` to run the database
- run `npx npx drizzle-kit migrate` to create table and insert data
- run `npm run dev` to start the app