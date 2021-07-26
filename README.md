# EVENTOOK

A minimal web application for people to browse upcoming events and book tickets. It also allow events organizers to create their events and track bookings.

[Live Demo](https://eventook.netlify.app/)

## Run Locally

Clone the project

```bash
  git clone https://github.com/marwaneahansal/eventook.git
```

### FrontEnd

Go to the project frontend directory

```bash
  cd eventook/frontend/eventook-frontend
```

Install dependencies

```bash
  npm install
```

Copy .env-example to .env and add the following environment
variable for the backend url

`VUE_APP_BACKEND_URL`

Start the server

```bash
  npm run serve
```

### BackEnd

Go to the project backend directory

```bash
  cd eventook/backend
```

Install dependencies

```bash
  npm install
```

Copy .env-example to .env and add all the environment
variables

`PORT`

`DEV_DB_` (Database informations)

`FRONTEND_URL`

`SESSION_SECRET`

`SESSIONS_DB_` (informations to store users sessions)

Create Database tables using Sequelize migrations

```bash
  npx sequelize-cli db:migrate
```

Seed the tables

```bash
  npx sequelize-cli db:seed:all
```

Start the server

```bash
  npm run start
```

## Tech Stack

**Client:** Vue, Buefy

**Server:** Node, Express
