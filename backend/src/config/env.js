const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

module.exports = {
  port: process.env.PORT || 8000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'medicare_secret_jwt_key_2026_super_secure',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  uploadDir: path.join(__dirname, '../../', process.env.UPLOAD_DIR || 'uploads'),
};
