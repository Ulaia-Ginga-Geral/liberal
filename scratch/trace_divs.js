const fs = require('fs');
const content = fs.readFileSync('src/app/portal/financas/page.tsx', 'utf8');
const lines = content.split('\n');
let stack = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const reOpen = /<div/g;
  const reClose = /<\/div>/g;
  let match;
  while ((match = reOpen.exec(line)) !== null) {
    stack.push(i + 1);
  }
  while ((match = reClose.exec(line)) !== null) {
    if (stack.length > 0) {
      stack.pop();
    } else {
      console.log(`Extra close div at line ${i + 1}`);
    }
  }
}
console.log(`Unclosed divs started at lines: ${stack.join(', ')}`);
