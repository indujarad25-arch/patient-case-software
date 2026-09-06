const mockStore = require('../data/mockStore');

const getRecords = async (req, res, next) => {
  try {
    const { patientId } = req.params;
    const records = mockStore.getHospitalRecords(patientId);
    return res.json(records);
  } catch (err) {
    next(err);
  }
};

const requestAccess = async (req, res, next) => {
  try {
    const { recordId } = req.params;
    const updatedRecord = mockStore.requestHospitalRecordAccess(recordId);
    if (!updatedRecord) {
      return res.status(404).json({ success: false, message: 'Hospital record not found' });
    }
    return res.json(updatedRecord);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getRecords,
  requestAccess
};
