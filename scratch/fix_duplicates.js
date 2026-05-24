const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// The duplicate block starts at the second occurrence of "<!-- 11. Paddy Seeds -->"
// and ends right before "  </div>\n</section>\n<!-- END CROPS SHOWCASE SECTION -->"
// We need to find the SECOND occurrence of the paddy seeds block and remove it along with sweet potato

const paddyComment = '    <!-- 11. Paddy Seeds -->';
const firstIdx = content.indexOf(paddyComment);
const secondIdx = content.indexOf(paddyComment, firstIdx + 1);

if (firstIdx === -1) {
  console.error('ERROR: Could not find "<!-- 11. Paddy Seeds -->" comment at all!');
  process.exit(1);
}

if (secondIdx === -1) {
  console.log('No duplicate found - the file may already be fixed.');
  process.exit(0);
}

console.log(`Found first occurrence at index: ${firstIdx}`);
console.log(`Found second (duplicate) occurrence at index: ${secondIdx}`);

// The duplicate section ends before "  </div>\n</section>"
// Find the closing tags after the second paddy seeds block
const endMarker = '  </div>\n</section>';
const endIdx = content.indexOf(endMarker, secondIdx);

if (endIdx === -1) {
  console.error('ERROR: Could not find end marker after duplicate block!');
  process.exit(1);
}

console.log(`End marker found at index: ${endIdx}`);

// Remove the duplicate block: from secondIdx to endIdx, then keep the end marker
const before = content.substring(0, secondIdx);
const after = content.substring(endIdx);

// Trim any trailing blank line before the end marker
const fixed = before.trimEnd() + '\n' + after;

fs.writeFileSync(indexPath, fixed, 'utf8');
console.log('SUCCESS: Duplicate Paddy Seeds and Sweet Potato Seeds cards removed from index.html');

// Verify
const verify = fs.readFileSync(indexPath, 'utf8');
const countPaddy = (verify.match(/<!-- 11\. Paddy Seeds -->/g) || []).length;
const countSweet = (verify.match(/<!-- 12\. Sweet Potato Seeds -->/g) || []).length;
console.log(`Verification - Paddy Seeds cards: ${countPaddy} (expected: 1)`);
console.log(`Verification - Sweet Potato Seeds cards: ${countSweet} (expected: 1)`);
