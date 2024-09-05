const fs = require('fs');
const path = require('path');

module.exports = (on, config) => {
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
};
