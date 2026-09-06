const express = require('express');
const router = express.Router();
const doctorAIController = require('../controllers/doctorAIController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/query', doctorAIController.query);

module.exports = router;
