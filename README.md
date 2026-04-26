# Salon Backend API

This is the backend API for the Salon Management System.

The backend is built using **Node.js**, **Express.js**, **TypeScript**, **MongoDB Atlas**, and **Mongoose**. It is designed to work with a **Next.js frontend**.

---

## Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB Atlas
- Mongoose
- CORS
- Dotenv
- Nodemon
- ts-node

---

## Project Structure

```txt
backend/
│
├── src/
│   ├── config/
│   │   └── db.ts
│   │
│   ├── server.ts
│   │
│   ├── models/
│   │
│   ├── routes/
│   │
│   ├── controllers/
│   │
│   └── middleware/
│
├── .env
├── .gitignore
├── nodemon.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## Installation

Install dependencies:

```bash
npm install
```

---

## Required Packages

Install main backend packages:

```bash
npm install express mongoose cors dotenv
```

Install TypeScript development packages:

```bash
npm install -D typescript ts-node nodemon @types/node @types/express @types/cors
```

---

## Environment Variables

Create a `.env` file in the root folder.

```env
PORT=5000
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster-url.mongodb.net/salon_db?retryWrites=true&w=majority
```

Do not upload your `.env` file to GitHub.

---

## Git Ignore

Create a `.gitignore` file.

```gitignore
node_modules
dist
.env
```

---

## TypeScript Config

Create TypeScript config:

```bash
npx tsc --init
```

Recommended `tsconfig.json` setup:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

---

## Nodemon Config

Create `nodemon.json`:

```json
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "ts-node src/server.ts"
}
```

---

## Package Scripts

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "nodemon",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

---

## Database Connection

File path:

```txt
src/config/db.ts
```

```ts
import mongoose = require("mongoose");

const connectDB = async (): Promise<void> => {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env file");
    }

    await mongoose.connect(MONGO_URI);

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

module.exports = { connectDB };
```

---

## Server Setup

File path:

```txt
src/server.ts
```

```ts
import express = require("express");
import dotenv = require("dotenv");
import cors = require("cors");
import type { Request, Response } from "express";

dotenv.config();

const { connectDB } = require("./config/db");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Salon Backend API is running");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
};

startServer();
```

---

## Run Development Server

```bash
npm run dev
```

The backend will run on:

```txt
http://localhost:5000
```

---

## Test API

Open this URL in browser or Postman:

```txt
GET http://localhost:5000
```

Expected response:

```txt
Salon Backend API is running
```

---

## Future API Routes

The backend can be extended with these routes:

```txt
/api/auth
/api/services
/api/staff
/api/customers
/api/appointments
/api/invoices
/api/dashboard
```

---

## Recommended API Structure

Example service module structure:

```txt
src/
├── models/
│   └── service.model.ts
│
├── controllers/
│   └── service.controller.ts
│
├── routes/
│   └── service.routes.ts
```

---

## MongoDB Atlas Setup

Make sure your MongoDB Atlas settings are correct.

1. Go to MongoDB Atlas.
2. Open your cluster.
3. Go to **Network Access**.
4. Add your IP address.
5. For development, you can use:

```txt
0.0.0.0/0
```

6. Go to **Database Access**.
7. Create a database user.
8. Copy the connection string.
9. Add it to `.env`.

---

## Security Note

Never share your MongoDB username and password publicly.

If you accidentally shared your password, change it immediately in MongoDB Atlas.

---

## Author

Developed by Sahan Dhanujaya.
