const mockStore = require('../data/mockStore');

const getDocuments = async (req, res, next) => {
  try {
    const { patientId } = req.query;
    const docs = mockStore.getDocuments(patientId);
    return res.json(docs);
  } catch (err) {
    next(err);
  }
};

const uploadDocument = async (req, res, next) => {
  try {
    const file = req.file;
    const body = req.body || {};

    const fileSizeStr = file ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : '1.2 MB';
    const fileUrl = file ? `/uploads/${file.filename}` : '/uploads/sample.pdf';

    const docData = {
      patientId: body.patientId || 'pt_1001',
      patientName: body.patientName || 'Patient',
      documentName: body.documentName || (file ? file.originalname : 'Scanned Medical Report.pdf'),
      documentType: body.documentType || 'Lab Report',
      fileUrl,
      fileSize: fileSizeStr,
      tags: body.tags ? String(body.tags).split(',').map(t => t.trim()) : ['Lab Report'],
      extractedInfo: body.extractedInfo || 'Medical report processed and text extracted successfully.'
    };

    const createdDoc = mockStore.addDocument(docData);
    return res.status(201).json(createdDoc);
  } catch (err) {
    next(err);
  }
};

const deleteDocument = async (req, res, next) => {
  try {
    const success = mockStore.deleteDocument(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }
    return res.json({ success: true, message: 'Document deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDocuments,
  uploadDocument,
  deleteDocument
};
