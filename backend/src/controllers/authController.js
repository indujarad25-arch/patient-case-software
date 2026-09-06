const jwt = require('jsonwebtoken');
const env = require('../config/env');
const mockStore = require('../data/mockStore');

const login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ success: false, message: 'Identifier and password are required' });
    }

    const doctor = mockStore.getDoctor();
    // Return login response structure expected by frontend authService
    // authService.login returns { doctor, requiresOtp: false } or direct token
    const token = jwt.sign(
      { id: doctor.id, email: doctor.email, role: doctor.role },
      env.jwtSecret,
      { expiresIn: '24h' }
    );

    return res.json({
      success: true,
      doctor,
      token,
      requiresOtp: false,
      message: 'Login successful'
    });
  } catch (err) {
    next(err);
  }
};

const verifyOtp = async (req, res, next) => {
  try {
    const { identifier, otp } = req.body;
    const doctor = mockStore.getDoctor();
    const token = jwt.sign(
      { id: doctor.id, email: doctor.email, role: doctor.role },
      env.jwtSecret,
      { expiresIn: '24h' }
    );

    return res.json({
      success: true,
      doctor,
      token
    });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    return res.json({ success: true, message: 'Logout successful' });
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const doctor = mockStore.getDoctor();
    return res.json(doctor);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  verifyOtp,
  logout,
  getProfile
};
