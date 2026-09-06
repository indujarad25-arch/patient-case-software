const mockStore = require('../data/mockStore');

const query = async (req, res, next) => {
  try {
    const { patientId, question, conversationHistory } = req.body;

    if (!question) {
      return res.status(400).json({ success: false, message: 'Question parameter is required' });
    }

    const patient = patientId ? mockStore.getPatientById(patientId) : null;
    const patientName = patient ? patient.fullName : 'the patient';
    const patientCases = patientId ? mockStore.getCases(patientId) : [];
    const patientDocs = patientId ? mockStore.getDocuments(patientId) : [];
    const patientMeds = patientId ? mockStore.getMedications(patientId) : [];

    const qLower = question.toLowerCase();
    let answer = '';
    let sources = [];

    if (qLower.includes('bp') || qLower.includes('blood pressure') || qLower.includes('hypertension')) {
      answer = `Based on ${patientName}'s clinical records, the patient has a history of Stage 2 Essential Hypertension. Recent BP reading was 154/96 mmHg. Current active medications include Amlodipine 5mg OD and Telmisartan 40mg OD. Low sodium diet (<2g/day) is recommended.`;
      sources = [
        { type: 'Clinical Case', title: 'CASE-2026-001 (Hypertension Evaluation)', date: '2026-03-01' },
        { type: 'Medication Record', title: 'Active Anti-hypertensive Regimen', date: '2026-01-15' }
      ];
    } else if (qLower.includes('allergy') || qLower.includes('penicillin')) {
      answer = `${patientName} has a recorded SEVERE allergy to Penicillin causing Anaphylaxis and Urticaria. Avoid all beta-lactam antibiotics and penicillin derivatives.`;
      sources = [
        { type: 'Allergy Record', title: 'Penicillin Drug Allergy (Severe)', date: '2024-06-12' }
      ];
    } else if (qLower.includes('lab') || qLower.includes('report') || qLower.includes('lipid') || qLower.includes('creatinine')) {
      answer = `Recent lab reports for ${patientName} show: Serum Creatinine 0.9 mg/dL (Normal range), Total Cholesterol 210 mg/dL, LDL 135 mg/dL (Mild elevation), HDL 42 mg/dL. ECG showed normal sinus rhythm at 78 bpm.`;
      sources = [
        { type: 'Lab Document', title: 'Lipid Profile & Renal Function Test.pdf', date: '2026-03-01' },
        { type: 'Diagnostic Document', title: 'ECG Report 12-Lead.pdf', date: '2026-03-01' }
      ];
    } else {
      answer = `Clinical AI Summary for ${patientName}: Patient is a ${patient ? patient.age : '42'}-year-old ${patient ? patient.gender : 'Male'} registered at MediCare Super Speciality Hospital. Active diagnosis includes Stage 2 Hypertension. ${patientCases.length} case file(s), ${patientDocs.length} medical document(s), and ${patientMeds.length} active medication(s) are recorded.`;
      sources = [
        { type: 'Patient Profile', title: `Patient Chart (${patient ? patient.patientId : 'PT-1001'})`, date: '2026-03-01' },
        { type: 'EHR Summary', title: 'Electronic Health Record Overview', date: '2026-03-05' }
      ];
    }

    return res.json({
      answer,
      sources,
      conversationId: `conv-${Date.now()}`
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  query
};
