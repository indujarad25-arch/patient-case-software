const mockStore = require('../data/mockStore');

const getPrescriptions = async (req, res, next) => {
  try {
    const { patientId } = req.query;
    const prescriptions = mockStore.getPrescriptions(patientId);
    return res.json(prescriptions);
  } catch (err) {
    next(err);
  }
};

const createPrescription = async (req, res, next) => {
  try {
    const newPrescription = mockStore.addPrescription(req.body);
    return res.status(201).json(newPrescription);
  } catch (err) {
    next(err);
  }
};

const confirmPrescription = async (req, res, next) => {
  try {
    const confirmed = mockStore.confirmPrescription(req.params.id);
    if (!confirmed) {
      return res.status(404).json({ success: false, message: 'Prescription not found' });
    }
    return res.json(confirmed);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPrescriptions,
  createPrescription,
  confirmPrescription
};
