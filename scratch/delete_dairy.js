const fs = require('fs');
const path = require('path');

const targetDir = 'e:\\greenspout\\the-journey-of-farm-to-table-dairy-freshness-to-your-home';

if (fs.existsSync(targetDir)) {
  fs.rmSync(targetDir, { recursive: true, force: true });
  console.log('Successfully deleted dairy blog directory!');
} else {
  console.log('Dairy blog directory does not exist or already deleted.');
}
