const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'frontend', 'dist');

const itemsToCopy = ['index.html', 'favicon.svg', 'icons.svg', 'videos'];

console.log('📦 Syncing production build to repository root for GitHub Pages...');

for (const item of itemsToCopy) {
  const src = path.join(distDir, item);
  const dest = path.join(rootDir, item);

  if (fs.existsSync(src)) {
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
      fs.cpSync(src, dest, { recursive: true });
    } else {
      fs.copyFileSync(src, dest);
    }
    console.log(` ✓ Copied ${item} to root`);
  }
}

console.log('✅ GitHub Pages root deployment assets synced successfully!');
