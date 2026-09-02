import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const REMOTE_USER = 'ddscards';
const REMOTE_HOST = 'raydelto.org';
const REMOTE_PATH = '/home/ddscards/public_html/xvelopers';
const TAR_FILE = 'dist.tar.gz';

console.log('🚀 Starting deployment to production (www.xvelopers.org)...');

// 1. Build if dist does not exist
if (!fs.existsSync('dist')) {
  console.log('📦 Building project first...');
  execSync('npm run build', { stdio: 'inherit' });
}

try {
  // 2. Archive dist folder
  console.log('🗜️  Archiving dist folder...');
  if (fs.existsSync(TAR_FILE)) {
    fs.unlinkSync(TAR_FILE);
  }
  execSync(`tar -czf ${TAR_FILE} -C dist .`, { stdio: 'inherit' });

  // 3. Upload archive to production server
  console.log(`📤 Uploading ${TAR_FILE} to ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}...`);
  execSync(`scp -o StrictHostKeyChecking=accept-new ${TAR_FILE} ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/${TAR_FILE}`, { stdio: 'inherit' });

  // 4. Extract archive on server and clean up legacy files
  console.log('⚡ Extracting on production server...');
  const remoteCommands = [
    `cd ${REMOTE_PATH}`,
    `tar -xzf ${TAR_FILE}`,
    `rm -f ${TAR_FILE}`,
    `rm -f app.min.js`, // Remove legacy grunt bundle
    `chmod 644 index.html xvelopers.json .htaccess favicon.svg 2>/dev/null || true`,
    `chmod -R 755 assets 2>/dev/null || true`
  ].join(' && ');

  execSync(`ssh -o StrictHostKeyChecking=accept-new ${REMOTE_USER}@${REMOTE_HOST} "${remoteCommands}"`, { stdio: 'inherit' });

  console.log('✅ Deployment finished successfully!');
  console.log('🌐 Visit: https://www.xvelopers.org');
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
} finally {
  if (fs.existsSync(TAR_FILE)) {
    fs.unlinkSync(TAR_FILE);
  }
}
