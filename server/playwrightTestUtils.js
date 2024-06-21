const { Client } = require("pg");
const { PostgreSqlContainer } = require("@testcontainers/postgresql");
const { connectDb } = require("./src/db");
const { disconnectDb } = require("./src/db");
const createServer = require("./src/server");

let app;
let postgresContainer;
let postgresClient;

async function playwrightStartDB() {
  console.log("creating new database...");

  // Start the Postgres container
  postgresContainer = await new PostgreSqlContainer().start();

  // Configure the container with env variables
  process.env.DB_USER = postgresContainer.getUsername();
  process.env.DB_PASSWORD = postgresContainer.getPassword();
  process.env.DB_HOST = postgresContainer.getHost();
  process.env.DB_PORT = postgresContainer.getPort();
  process.env.DB_NAME = postgresContainer.getDatabase();

  // Create pg client & connect to database
  postgresClient = new Client({
    connectionString: postgresContainer.getConnectionUri(),
  });

  await postgresClient.connect();

  // Create database schemas
  await postgresClient.query(
    `CREATE TABLE todo (id SERIAL PRIMARY KEY, description VARCHAR(255))`
  );
}

async function playwrightCreateServer() {
  console.log("creating new server...");
  const pool = await connectDb();
  const app = createServer(pool);
  const PORT = process.env.SERVER_PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

async function playwrightStopDB() {
  console.log("deleting test database...");
  await disconnectDb();
  await postgresClient.end();
  await postgresContainer.stop();
}

module.exports = {
  playwrightStartDB,
  playwrightCreateServer,
  playwrightStopDB,
  app,
};
