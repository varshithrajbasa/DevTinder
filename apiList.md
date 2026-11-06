# DevTinder APIs

| Method | Route                              | Comments                                        |
| ------ | ---------------------------------- | ----------------------------------------------- |
| POST   | /auth/signup                       | Create a user account                           |
| POST   | /auth/login                        | Log in a user                                   |
| POST   | /auth/logout                       | Log out the current user                        |
| GET    | /profile/view                      | View the current user's profile                 |
| PATCH  | /profile/edit                      | Update the current user's profile               |
| PATCH  | /profile/password                  | Change the current user's password              |
| POST   | /request/send/:status/:userId      | Send a connection request to a user             |
| POST   | /request/review/:status/:requestId | Accept or Reject an incoming connection request |
| GET    | /user/connections                  | List the current user's connections             |
| GET    | /user/requests/received            | List incoming connection requests               |
| GET    | /user/feed                         | Get users to browse                             |
| GET    | /status                            | Check the API server status                     |
