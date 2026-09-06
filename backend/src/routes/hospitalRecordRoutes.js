const express = require('express');
const router = express.Router();
const hospitalRecordController = require('../controllers/hospitalRecordController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/:patientId', hospitalRecordController.getRecords);
router.post('/:recordId/request-access', hospitalRecordController.requestAccess);

module.exports = router;
