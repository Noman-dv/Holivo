#!/usr/bin/env node

/**
 * Deployment script for Holivo
 * Copies built files from 'out' folder to public_html or specified destination
 * 
 * Usage:
 *   npm run deploy                    # Builds only
 *   npm run deploy -- /path/to/public_html  # Builds and copies
 */

const fs = require('fs');
const path = require('path');

const deployPath = process.argv[2] || process.env.DEPLOY_PATH;

if (deployPath) {
  const outDir = path.join(process.cwd(), 'out');
  const targetDir = deployPath;

  // Check if out directory exists
  if (!fs.existsSync(outDir)) {
    console.error('❌ Error: "out" folder not found. Please run "npm run build" first.');
    process.exit(1);
  }

  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    console.log(`📁 Creating directory: ${targetDir}`);
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Function to copy directory recursively
  function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      fs.readdirSync(src).forEach(childItemName => {
        copyRecursiveSync(
          path.join(src, childItemName),
          path.join(dest, childItemName)
        );
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  }

  console.log(`📦 Copying files from 'out' to '${targetDir}'...`);
  copyRecursiveSync(outDir, targetDir);

  // Copy .htaccess if it exists
  const htaccessPath = path.join(process.cwd(), '.htaccess');
  if (fs.existsSync(htaccessPath)) {
    const targetHtaccess = path.join(targetDir, '.htaccess');
    fs.copyFileSync(htaccessPath, targetHtaccess);
    console.log('✓ Copied .htaccess');
  }

  console.log('✅ Deployment complete!');
} else {
  console.log('✅ Build complete! Files are in the "out" folder');
  console.log('');
  console.log('To deploy to public_html, run:');
  console.log('  npm run deploy -- /path/to/public_html');
  console.log('or set DEPLOY_PATH environment variable:');
  console.log('  DEPLOY_PATH=/path/to/public_html npm run deploy');
}
