# LootMogul Project

This project consists of a backend server for user authentication and middlewares, and a frontend client for rendering and external API interactions.

## Server Directory

### Database Configuration

1. Create a `.env` file in the server directory and add the following configuration:

```
PORT=5000
JWT_ACCESS_EXPIRATION_MINUTES=60
JWT_REFRESH_EXPIRATION_DAYS=1
JWT_SECRET=SECRET_KEY

PG_USERNAME=username
PG_PASSWORD=password
PG_DATABASE=database
PG_HOST=host
```

Replace the database name, username, host, and password with your actual values.

2. Run the following commands to install dependencies and create the database and tables:

```bash
npm install
npm run prepare
```

A `config.json` file will be automatically created after this step, located at `server/config`.

### Starting the Server

To start the server, run one of the following commands:

```bash
npm run start
```

or

```bash
npm run start:dev
```
