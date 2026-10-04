const fs = require('fs');
const path = require('path');

function findRouteFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findRouteFiles(filePath));
    } else if (file === 'route.ts' || file === 'route.js') {
      results.push(filePath);
    }
  }
  return results;
}

const apiDir = path.join(__dirname, '..', 'src', 'app', 'api');
const routeFiles = findRouteFiles(apiDir);
const patched = [];

for (const file of routeFiles) {
  const content = fs.readFileSync(file, 'utf8');
  if (!content.includes('export const dynamic')) {
    // Add export const dynamic = 'force-dynamic'; at top
    const newContent = `export const dynamic = 'force-dynamic';\n\n` + content;
    fs.writeFileSync(file, newContent, 'utf8');
    patched.push(path.relative(path.join(__dirname, '..'), file));
  }
}

console.log(`Patched ${patched.length} routes:`);
patched.forEach(p => console.log(' - ' + p));
