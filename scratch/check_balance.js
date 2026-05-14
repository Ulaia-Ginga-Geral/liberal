const fs = require('fs');
const content = fs.readFileSync('src/app/portal/financas/page.tsx', 'utf8');
try {
  // We can't easily parse TSX with pure node without a parser like @babel/parser
  // but we can check basic brace balance
  let braces = 0;
  let parentheses = 0;
  let brackets = 0;
  for (let i = 0; i < content.length; i++) {
    if (content[i] === '{') braces++;
    if (content[i] === '}') braces--;
    if (content[i] === '(') parentheses++;
    if (content[i] === ')') parentheses--;
    if (content[i] === '[') brackets++;
    if (content[i] === ']') brackets--;
    if (braces < 0 || parentheses < 0 || brackets < 0) {
      console.log(`Unbalanced at index ${i}: b:${braces} p:${parentheses} br:${brackets}`);
      break;
    }
  }
  console.log(`Final counts: b:${braces} p:${parentheses} br:${brackets}`);
} catch (e) {
  console.error(e);
}
