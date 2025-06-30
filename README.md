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
- Create the database and add corresponding `.env` file in root directory of the project (for example see [this](https://nextjs.org/learn/dashboard-app/setting-up-your-database#create-a-postgres-database) Vercel guide).
- Visit: [http://localhost:3000/api/seed](http://localhost:3000/api/seed), which will create all required tables and initial data.
 
### Authentication

Some routes are protected (e.g. adding a movie). You can use following username and password (this will be set by the `seed` endpoint above) for accessing those:
```
user: demo@gmail.com
pass: 123456
```

### Environment Variables

- `SECRET_KEY`: This project requires a secret key for signing/verifying purposes (e.g., JWT, encryption, etc.). It is configured using the `SECRET_KEY` environment variable. If `SECRET_KEY` is not set and the app is running in development mode, a default value (`test-secret-key`) will be used.

