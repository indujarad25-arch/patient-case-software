const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', patientController.getPatients);
router.post('/', patientController.registerPatient);
router.get('/:id', patientController.getPatient);
router.put('/:id', patientController.updatePatient);
router.get('/:patientId/allergies', patientController.getAllergies);
router.get('/:patientId/medications', patientController.getMedications);
router.get('/:patientId/history', patientController.getHistory);

module.exports = router;
