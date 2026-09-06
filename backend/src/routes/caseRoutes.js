const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', caseController.getCases);
router.post('/', caseController.createCase);
router.get('/:id', caseController.getCase);
router.put('/:id', caseController.updateCase);
router.post('/:id/confirm', caseController.confirmCase);

module.exports = router;
