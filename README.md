# DevTinder

DevTinder is a Node.js and Express backend for a developer networking app. It provides account authentication, profile management, connection requests, and a feed of other users. MongoDB stores user and connection data.

## Requirements

- Node.js and npm
- A MongoDB database

## Getting started

1. Install dependencies:

   ```sh
   npm install
   ```

2. Create a `.env` file from the example:

   ```sh
   cp .env.example .env
   ```

   On Windows PowerShell, you can use `Copy-Item .env.example .env`.

3. Set the following values in `.env`:

   | Variable | Description |
   | --- | --- |
   | `MONGODB_URI` | MongoDB connection string |
   | `SALT_ROUNDS` | Number of bcrypt salt rounds used to hash passwords |
   | `JWT_SECRET` | Secret used to sign authentication tokens |

4. Start the server:

   ```sh
   npm start
   ```

   The API runs on `http://localhost:3000`. The `npm run dev` script is also available if nodemon is installed.

The server connects to MongoDB before it starts listening.

## Authentication

Sign up and log in using the `/auth` routes. A successful login sets an HTTP-only `token` cookie containing an eight-hour JWT. Send that cookie with requests to protected routes under `/profile`, `/request`, and `/user`. Logging out clears the cookie.

## API

The API accepts JSON request bodies. Use `http://localhost:3000` as the base URL.

| Method | Route | Authentication | Description |
| --- | --- | --- | --- |
| `GET` | `/api/status` | No | Check whether the API is running |
| `POST` | `/auth/signup` | No | Create an account |
| `POST` | `/auth/login` | No | Log in and set the authentication cookie |
| `POST` | `/auth/logout` | No | Clear the authentication cookie |
| `GET` | `/profile/view` | Yes | View the current user's profile |
| `PATCH` | `/profile/edit` | Yes | Update profile fields |
| `POST` | `/request/send/:status/:toUserId` | Yes | Send a request with status `interested` or `ignored` |
| `POST` | `/request/review/:status/:requestId` | Yes | Review an incoming request with status `accepted` or `rejected` |
| `GET` | `/user/connections` | Yes | List accepted connections |
| `GET` | `/user/requests/received` | Yes | List incoming interested requests |
| `GET` | `/user/feed` | Yes | Browse users, with optional `page` and `limit` query parameters |

Signup requires `firstName`, `lastName`, `emailId`, `password`, `age`, and `gender`. The supported gender values are `Male`, `Female`, and `Other`; `skills` is optional.

Profile edits accept `firstName`, `lastName`, `age`, `gender`, and `skills`. The feed defaults to page 1 with 10 users per page and caps the page size at 50.

For the API route list, see [apiList.md](./apiList.md).

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the API |
| `npm run dev` | Start the API with nodemon (install nodemon separately; it is not included in the project dependencies) |
