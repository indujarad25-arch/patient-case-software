const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.use(authMiddleware);

router.get('/', documentController.getDocuments);
router.post('/', upload.single('file'), documentController.uploadDocument);
router.delete('/:id', documentController.deleteDocument);

module.exports = router;
