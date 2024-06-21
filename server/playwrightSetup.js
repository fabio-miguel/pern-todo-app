const { test: setup } = require("@playwright/test");
const {
  playwrightStartDB,
  playwrightCreateServer,
} = require("./playwrightTestUtils");

async function playwrightSetup() {
  await playwrightStartDB();
  await playwrightCreateServer();
}

module.exports = playwrightSetup;
