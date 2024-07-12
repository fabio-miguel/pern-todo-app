const { playwrightStopDB } = require("./playwrightTestUtils");

async function playwrightTeardown() {
  try {
    await playwrightStopDB();
  } catch (err) {
    `Error closing database connection or stopping container: ${err}`;
  }
}

module.exports = playwrightTeardown;
