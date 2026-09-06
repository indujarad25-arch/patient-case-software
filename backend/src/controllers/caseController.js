const mockStore = require('../data/mockStore');

const getCases = async (req, res, next) => {
  try {
    const { patientId } = req.query;
    const cases = mockStore.getCases(patientId);
    return res.json(cases);
  } catch (err) {
    next(err);
  }
};

const getCase = async (req, res, next) => {
  try {
    const clinicalCase = mockStore.getCaseById(req.params.id);
    if (!clinicalCase) {
      return res.status(404).json({ success: false, message: 'Case not found' });
    }
    return res.json(clinicalCase);
  } catch (err) {
    next(err);
  }
};

const createCase = async (req, res, next) => {
  try {
    const newCase = mockStore.addCase(req.body);
    return res.status(201).json(newCase);
  } catch (err) {
    next(err);
  }
};

const updateCase = async (req, res, next) => {
  try {
    const updated = mockStore.updateCase(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Case not found' });
    }
    return res.json(updated);
  } catch (err) {
    next(err);
  }
};

const confirmCase = async (req, res, next) => {
  try {
    const confirmed = mockStore.confirmCase(req.params.id);
    if (!confirmed) {
      return res.status(404).json({ success: false, message: 'Case not found' });
    }
    return res.json(confirmed);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCases,
  getCase,
  createCase,
  updateCase,
  confirmCase
};
