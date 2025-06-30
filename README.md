A Next.js App Router movie application allowing users to search, add, edit, and delete movies, backed by a PostgreSQL database.

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
- Create the database (for example see [this](https://nextjs.org/learn/dashboard-app/setting-up-your-database#create-a-postgres-database) Vercel guide).
- Set up environment variables (see [Environment Setup](#environment-setup) section below, for instructions on creating the `.env` file).
- Visit: [http://localhost:3000/api/seed](http://localhost:3000/api/seed), which will create all required tables and initial data.
 
### Authentication

Some routes are protected (e.g. adding a movie). You can use following username and password (this will be set by the `seed` endpoint above) for accessing those:
```
user: demo@gmail.com
pass: 123456
```

### Environment Setup

- Copy the `.env.example` file and rename it to `.env`.
- Edit `.env` to add your own configuration values.
- Do not commit your `.env` file — it contains sensitive info.

#### Environment Variables

Below is description of existing variables listed in `.env.example`.

- `DATABASE_URL`: The PostgreSQL connection string used by the app to connect to the database.
- `SECRET_KEY`: Secret key used for signing and verifying tokens or encrypting data. If not set in development, a default test-secret-key will be used.

