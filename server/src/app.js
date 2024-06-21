const createServer = require("./server");
const { connectDb } = require("./db");
require("dotenv").config();

const pool = connectDb();
const app = createServer(pool);
const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
