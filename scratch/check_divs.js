const fs = require('fs');
const content = fs.readFileSync('src/app/portal/financas/page.tsx', 'utf8');
const lines = content.split('\n');
let divs = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const opens = (line.match(/<div/g) || []).length;
  const closes = (line.match(/<\/div>/g) || []).length;
  divs += opens - closes;
  if (divs < 0) {
    console.log(`Unbalanced div at line ${i + 1}: count ${divs}`);
    // Reset to see where it goes wrong again
    divs = 0;
  }
}
console.log(`Final div count: ${divs}`);
