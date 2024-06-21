const { Client } = require("pg");
const { PostgreSqlContainer } = require("@testcontainers/postgresql");
const { disconnectDb } = require("./src/db");

global.beforeAll(async () => {
  jest.setTimeout(60000);

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
});

//    Clear database before each test
global.beforeEach(async () => {
  await postgresClient.query("TRUNCATE todo RESTART IDENTITY");
});

global.afterAll(async () => {
  try {
    await disconnectDb();
    await postgresClient.end();
    await postgresContainer.stop();
  } catch (err) {
    console.error(
      `Error closing database connection or stopping container: ${err}`
    );
  }
});
