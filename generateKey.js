// generateKey.js
const crypto = require('crypto');

function generateTokenKey() {
  const key = crypto.randomBytes(32).toString('hex');
  console.log(`Generated TOKEN_KEY: ${key}`);
}

generateTokenKey();
