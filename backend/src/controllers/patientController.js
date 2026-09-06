const mockStore = require('../data/mockStore');

const getPatients = async (req, res, next) => {
  try {
    const result = mockStore.getPatients(req.query);
    return res.json(result);
  } catch (err) {
    next(err);
  }
};

const getPatient = async (req, res, next) => {
  try {
    const patient = mockStore.getPatientById(req.params.id);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    return res.json(patient);
  } catch (err) {
    next(err);
  }
};

const registerPatient = async (req, res, next) => {
  try {
    const newPatient = mockStore.addPatient(req.body);
    return res.status(201).json(newPatient);
  } catch (err) {
    next(err);
  }
};

const updatePatient = async (req, res, next) => {
  try {
    const updated = mockStore.updatePatient(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    return res.json(updated);
  } catch (err) {
    next(err);
  }
};

const getAllergies = async (req, res, next) => {
  try {
    const allergies = mockStore.getAllergies(req.params.patientId);
    return res.json(allergies);
  } catch (err) {
    next(err);
  }
};

const getMedications = async (req, res, next) => {
  try {
    const medications = mockStore.getMedications(req.params.patientId);
    return res.json(medications);
  } catch (err) {
    next(err);
  }
};

const getHistory = async (req, res, next) => {
  try {
    const history = mockStore.getHistory(req.params.patientId);
    return res.json(history);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPatients,
  getPatient,
  registerPatient,
  updatePatient,
  getAllergies,
  getMedications,
  getHistory
};
