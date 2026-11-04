# DevTinder APIs

| Method | Route                               | Comments                              |
| ------ | ----------------------------------- | ------------------------------------- |
| POST   | /auth/signup                        | Create a user account                 |
| POST   | /auth/login                         | Log in a user                         |
| POST   | /auth/logout                        | Log out the current user              |
| GET    | /profile/view                       | View the current user's profile       |
| PATCH  | /profile/edit                       | Update the current user's profile     |
| PATCH  | /profile/password                   | Change the current user's password    |
| POST   | /request/send/interested/:userId    | Send a connection request to a user   |
| POST   | /request/send/ignored/:userId       | Ignore a user                         |
| POST   | /request/review/accepted/:requestId | Accept an incoming connection request |
| POST   | /request/review/rejected/:requestId | Reject an incoming connection request |
| GET    | /connections                        | List the current user's connections   |
| GET    | /requests/received                  | List incoming connection requests     |
| GET    | /feed                               | Get users to browse                   |
| GET    | /api/status                         | Check the API server status           |
