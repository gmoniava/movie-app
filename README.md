A Next.js App Router movie application allowing users to search, add, edit, and delete movies, backed by a SQL database.

## Getting Started

After cloning the project install dependencies using package manager of your choice. We will use `pnpm`.

```bash
pnpm install
```
Then run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Database
This project uses a PostgreSQL database.
- Create the database and add corresponding `.env` file in root directory of the project (For example see [this](https://nextjs.org/learn/dashboard-app/setting-up-your-database#create-a-postgres-database) Vercel guide).
- Visit: [http://localhost:3000/api/seed](http://localhost:3000/api/seed), which will create all required tables and initial data.
 
