# Orange Books Monitoring App

A small bookstore-themed monitoring demo built with Node.js, Express, TypeScript, and Sentry. The app combines a lightweight customer management CRUD API with a polished storefront dashboard and demonstrates how uptime and error monitoring can be displayed in a real-world product interface.

## What this project does

- Serves a bookstore landing page at `/bookshop`
- Exposes customer CRUD routes for managing users
- Includes a `/health` endpoint for uptime checks
- Includes a `/test-error` route that triggers a controlled Sentry exception
- Shows a visual frontend that mimics a store dashboard using an orange, white, and black theme
- Demonstrates how Sentry error IDs and monitoring responses can be shown in a UI

## Tech stack

- Node.js
- Express.js
- TypeScript
- Sentry
- Vercel-ready server setup

## Project features

- Customer create, read, update, and delete flow
- Storefront catalog with real book cover images
- Monitoring section for health and error testing
- Error reporting with Sentry event IDs
- Local development support and deployment-ready server config

## Local setup

1. Clone the repository

```bash
git clone <your-repo-url>
cd uptimerobot-vs-sentry-rep
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the project root

```env
PORT=5000
SENTRY_DSN=your_sentry_dsn_here
```

4. Run the app in development mode

```bash
npm run dev
```

5. Open the app in the browser

```text
http://localhost:5000/bookshop
```

## API routes

| Method | Route | Description |
| --- | --- | --- |
| GET | `/` | App welcome route |
| GET | `/health` | Health check endpoint |
| GET | `/bookshop` | Storefront frontend |
| GET | `/test-error` | Triggers a controlled Sentry exception |
| GET | `/users` | Get all users |
| POST | `/users` | Create user |
| GET | `/users/:id` | Get a single user |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |

## Example user payload

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

## Build and run

```bash
npm run build
npm start
```

The app will run from the compiled build in `dist/server.js`.

## Deployment

The project includes a Vercel configuration in [vercel.json](vercel.json) and a serverless entry file in [api/index.js](api/index.js).

To deploy:

1. Push the repo to GitHub
2. Import the project into Vercel
3. Deploy the root folder
4. Set the `SENTRY_DSN` environment variable in Vercel project settings

## Project structure

```text
uptimerobot-vs-sentry-rep/

├── public/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── src/
│   ├── controllers/
│   │   └── userController.ts
│   ├── middleware/
│   │   └── errorHandler.ts
│   ├── routes/
│   │   └── userRoutes.ts
│   ├── sentry.ts
│   └── server.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
├── README.md
