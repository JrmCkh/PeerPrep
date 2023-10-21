[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)

We have various micro-services including:
* MySQL Database
* User Service
* Auth Service
* Question Service
* Frontend Service (Web UI)

Additional Notes:

If you are not using Windows OS, and would like a equivalent instruction for a differnt OS, do reach out to us for clarification.

**For clarifications, do leave your questions at [Feedback PR](https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g32/pull/1) created in our repository.**

# Requirements

## Network

Internet connection is required.

**[ IMPORTANT! ]** Do _not_ test while on NUS grounds or connected
(either directly or indirectly) to NUS Wifi.
(NUS networks blocks MongoDB which is required by our application.) 

## Software
Download and install these software if you do not have them locally.

- [NodeJS](https://nodejs.org/en/download)
- [MySQL](https://dev.mysql.com/downloads/mysql/)
- [Erlang](https://www.erlang.org/downloads)
- [RabbitMQ](https://www.rabbitmq.com/download.html)

For development, you may also want to install:

- [MongoDB Compass](https://www.mongodb.com/try/download/compass)
- [Docker Desktop](https://www.docker.com/get-started/)

**Ensure that MySQL Server is NOT running locally.** 


## Setup MySQL locally

For clarity, the commands given below should be executed at the root directory if not specified otherwise.

_The commands below are provided for convenience and may be incorrect.
Do reach out to us for clarification if necessary._

## Pre-testing Set up

### Clone repository

Clone the repository locally to your device (laptop/computer).

```shell
git clone https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g32.git
```

Note: If the above not work, please use the correct link or download the source code directly from the release.

### Setup environment variables

Duplicate `template.env` as `.env` at the root directory.

```shell
cp template.env .env
```

### Start Docker Daemon

- Frontend: `cd frontend && npm start`
- Backend: `cd backend && npm start`
- Auth service: `cd Auth && npm start`
- Question service: `cd Question && npm start`
- User service: `cd User && npm start`
- Match service: `cd Match && npm start`

To check that the daemon has started, open a terminal and check the version.

| Backend API Path               | Method | Purpose                                             | Parameters (JSON format)                                              | Require JWT token to be in header? | Does user have to be maintainer? |
|--------------------------------|--------|-----------------------------------------------------|-----------------------------------------------------------------------|------------------------------------|----------------------------------|
| `/auth/authorize`              | GET    | Used to authorize all users                         | -                                                                     | Yes                                | No                               |
| `/auth/authorizeMaintainer`    | GET    | Used to authorize maintainers                       | -                                                                     | Yes                                | Yes                              |
| `/auth/generate`               | POST   | Used to generate JWT token after user has logged in | `userId` <br> `isMaintainer`                                          | No                                 | -                                |
| `/question/create`             | POST   | Used to create new question                         | `title` <br> `complexity` <br> `description` <br> `tags`              | Yes                                | Yes                              |
| `/question/delete`             | DELETE | Used to delete question                             | `id`                                                                  | Yes                                | Yes                              |
| `/question/edit`               | POST   | Used to edit question                               | `id` <br> `title` <br> `complexity` <br> `description` <br> `tags`    | Yes                                | Yes                              |
| `/question/getAll`             | GET    | Used to get all the questions from the database     | -                                                                     | Yes                                | No                               |
| `/question/getQuestionDetails` | GET    | Used to get the details of the specified question   | `id`                                                                  | Yes                                | No                               |
| `/user/change-password`        | POST   | Used to change user password                        | `id` <br> `currentPassword` <br> `newPassword` <br> `confirmPassword` | Yes                                | No                               |
| `/user/delete`                 | POST   | Used to delete user                                 | `id`                                                                  | Yes                                | No                               |
| `/user/login`                  | POST   | Used to login                                       | `email` <br> `password`                                               | No                                 | -                                |
| `/user/read`                   | POST   | Used to get user information                        | `id` or `email`                                                       | Yes                                | No                               |
| `/user/readAll`                | GET    | Used to get all users information                   | -                                                                     | Yes                                | Yes                              |
| `/user/signup`                 | POST   | Used to create new user                             | `email` <br> `password` <br> `confirmPassword`                        | No                                 | -                                |
| `/user/update`                 | POST   | Used to update user information (username)          | `id` <br> `username`                                                  | Yes                                | No                               |
| `/queue/join`                  | POST   | Used to join a queue for a match                    | `jwt` <br> `queueName` <br> `sessionID`                               | Yes                                | No                               |
| `/queue/exit`                  | POST   | Used to exit a queue from a match                   | `jwt` <br> `queueName` <br> `sessionID`                               | Yes                                | No                               |

- `auth` API (port 5001) contains all the authorization related endpoints.
- `question` API (port 3001) contains all the question data related endpoints.
- `user` API (port 4001) contains all the user data related endpoints (including authentication).
- `match` API (port 7001) contains all the match related endpoints.
- Note that if the API path requires JWT token to be in the header, it means the user has to be logged in.
