const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', prescriptionController.getPrescriptions);
router.post('/', prescriptionController.createPrescription);
router.post('/:id/confirm', prescriptionController.confirmPrescription);

module.exports = router;
