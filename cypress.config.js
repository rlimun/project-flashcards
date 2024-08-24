const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://localhost:3000",
    viewportWidth: 1280, // Set default viewport width
    viewportHeight: 720, // Set default viewport height
    retries: 2
  },
});
