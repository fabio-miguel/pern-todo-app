const { playwrightStopDB } = require("./playwrightTestUtils");

async function playwrightTeardown() {
  console.log("deleting test database...");
  try {
    await playwrightStopDB();
  } catch (err) {
    `Error closing database connection or stopping container: ${err}`;
  }
}

export default playwrightTeardown;
