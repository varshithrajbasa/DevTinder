# DevTinder API

Use `http://localhost:3000` as the base URL. Routes under `/profile`, `/request`, and `/user` require the authentication cookie set by `/auth/login`.

| Method | Route | Authentication | Description |
| ------ | ----- | -------------- | ----------- |
| GET | `/api/status` | No | Check whether the API is running |
| POST | `/auth/signup` | No | Create a user account |
| POST | `/auth/login` | No | Log in and set the authentication cookie |
| POST | `/auth/logout` | No | Clear the authentication cookie |
| GET | `/profile/view` | Yes | View the current user's profile |
| PATCH | `/profile/edit` | Yes | Update the current user's profile |
| POST | `/request/send/:status/:toUserId` | Yes | Send a connection request (`interested` or `ignored`) |
| POST | `/request/review/:status/:requestId` | Yes | Accept or reject an incoming request (`accepted` or `rejected`) |
| GET | `/user/connections` | Yes | List the current user's accepted connections |
| GET | `/user/requests/received` | Yes | List incoming interested requests |
| GET | `/user/feed` | Yes | Get users to browse; accepts optional `page` and `limit` query parameters |
