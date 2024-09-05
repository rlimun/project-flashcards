const { defineConfig } = require('cypress');
const fs = require('fs');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Register your tasks here
      on('task', {
        backupFile({ srcPath, destPath }) {
          fs.copyFileSync(srcPath, destPath);
          return null;
        },
        restoreFile({ srcPath, destPath }) {
          fs.copyFileSync(srcPath, destPath);
          return null;
        },
        writeFile({ filePath, content }) {
          fs.writeFileSync(filePath, content);
          return null;
        }
      });

      // You can return config if you need to modify it
      return config;
    },
    baseUrl: "http://localhost:3000",
    viewportWidth: 1280, // Set default viewport width
    viewportHeight: 720, // Set default viewport height
    retries: 2,
    chromeWebSecurity: false,     // Disable chromeWebSecurity
  },
});
