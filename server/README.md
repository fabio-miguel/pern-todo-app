## Security

Note: Any password visible in commit history is not valid and simply a "dumbby" password. If using this repo, you will need to configure your own password for your Postgres. Of course, you should avoid committing your password as this will expose your application. In fact, it's highly recommeded / critical that you don't hardcode your password directly into you application. Passwords, should be reserved for env variables. In this project, process.env.DB_PASSWORD was used to set the password outside of the application code. 

