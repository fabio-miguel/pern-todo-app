CREATE DATABASE perntodo;

CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);

/*
### PostgreSQL 

COMMANDS: 

"psql -U postgres" to sign in to super user account
"\l" to list all databases
"\c <databasename>" to conncet to specific database
"\dt" to find table relations

*/