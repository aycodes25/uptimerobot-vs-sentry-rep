# UptimeRobot vs Sentry Monitoring Comparison

A simple Node.js, Express, and TypeScript CRUD API built to practically compare **UptimeRobot** and **Sentry**.

## Project Purpose

This project was created to understand and compare two different monitoring tools:

- **UptimeRobot** – monitors whether an application or API is online and available.
- **Sentry** – monitors and captures errors happening inside an application.

The project includes a working CRUD API, a health check endpoint for uptime monitoring, and a controlled error endpoint for Sentry testing.

---

## Technologies Used

- Node.js
- TypeScript
- Express.js
- Sentry
- UptimeRobot
- Vercel

---

## Features

- Create User
- Get All Users
- Get Single User
- Update User
- Delete User
- Health Check Endpoint
- UptimeRobot Monitoring
- Sentry Error Monitoring
- Controlled Error Testing

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check that the API is running |
| GET | `/health` | Health check for monitoring |
| POST | `/users` | Create a user |
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get a single user |
| PUT | `/users/:id` | Update a user |
| DELETE | `/users/:id` | Delete a user |
| GET | `/test-error` | Trigger a controlled error for Sentry testing |

---

## CRUD Example

### Create User

**POST `/users`**

```json
{
  "name": "Tominiyi Ayomide",
  "email": "tominiyi@example.com"
}
```

---

## Project Setup

1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
```

2. Open the project folder

```bash
cd uptimerobot-vs-sentry
```

3. Install dependencies

```bash
npm install
```

4. Create environment variables

Create a file called `.env` and add the following:

```env
PORT=5000
SENTRY_DSN=YOUR_SENTRY_DSN
```

Replace `YOUR_SENTRY_DSN` with your actual Sentry project DSN.

5. Start the app in development mode

```bash
npm run dev
```

The application will run on:

```text
http://localhost:5000
```

Test the health endpoint:

```text
http://localhost:5000/health
```

Test the controlled error endpoint:

```text
http://localhost:5000/test-error
```

## Build for Production

Run:

```bash
npm run build
```

Then start the app:

```bash
npm start
```

---

## Project Structure

```text
uptimerobot-vs-sentry/
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

<img width="600" height="400" alt="Screenshot 2026-09-01 090421" src="https://github.com/user-attachments/assets/e018eaa2-5ae5-4341-83e2-b0e29330c1f9" />
<img width="600" height="400" alt="image" src="https://github.com/user-attachments/assets/c6c2ab30-5b8e-42df-bb7e-089c097e8342" />
<img width="600" height="400" alt="image" src="https://github.com/user-attachments/assets/e11bfeaa-9e1c-4f16-8915-4bf61f81e9c4" />
