const {
  seedDoctor,
  seedPatients,
  seedAllergies,
  seedMedications,
  seedCases,
  seedDocuments,
  seedPrescriptions,
  seedHistoryEvents,
  seedHospitalRecords
} = require('./seedData');

class MockStore {
  constructor() {
    this.doctor = { ...seedDoctor };
    this.patients = [...seedPatients];
    this.allergies = [...seedAllergies];
    this.medications = [...seedMedications];
    this.cases = [...seedCases];
    this.documents = [...seedDocuments];
    this.prescriptions = [...seedPrescriptions];
    this.historyEvents = [...seedHistoryEvents];
    this.hospitalRecords = [...seedHospitalRecords];
  }

  // Doctor Auth & Profile
  getDoctor() {
    return this.doctor;
  }

  updateDoctor(data) {
    this.doctor = { ...this.doctor, ...data };
    return this.doctor;
  }

  // Patients
  getPatients(params = {}) {
    let list = [...this.patients];
    const { query, page = 1, limit = 10, sortBy, sortOrder = 'asc' } = params;

    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.fullName.toLowerCase().includes(q) ||
          p.patientId.toLowerCase().includes(q) ||
          p.phone.includes(q) ||
          p.email.toLowerCase().includes(q)
      );
    }

    if (sortBy && list.length > 0) {
      list.sort((a, b) => {
        const valA = a[sortBy] || '';
        const valB = b[sortBy] || '';
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const total = list.length;
    const totalPages = Math.ceil(total / limitNum) || 1;
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedData = list.slice(startIndex, startIndex + limitNum);

    return {
      data: paginatedData,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages
    };
  }

  getPatientById(id) {
    return this.patients.find((p) => p.id === id || p.patientId === id) || null;
  }

  addPatient(data) {
    const nextNum = this.patients.length + 1001;
    const id = `pt_${Date.now()}`;
    const patientId = `PT-${nextNum}`;

    let age = 0;
    if (data.dateOfBirth) {
      const dob = new Date(data.dateOfBirth);
      const diffMs = Date.now() - dob.getTime();
      const ageDate = new Date(diffMs);
      age = Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    const newPatient = {
      id,
      patientId,
      fullName: data.fullName,
      dateOfBirth: data.dateOfBirth,
      age: data.age || age,
      gender: data.gender || 'Other',
      bloodGroup: data.bloodGroup || 'Unknown',
      phone: data.phone || '',
      email: data.email || '',
      address: data.address || '',
      city: data.city || '',
      state: data.state || '',
      pincode: data.pincode || '',
      emergencyContact: data.emergencyContact || { name: '', relationship: '', phone: '' },
      status: 'Active',
      registeredAt: new Date().toISOString(),
      registeredBy: this.doctor.name,
      hospital: this.doctor.hospital,
      photo: data.photo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'
    };

    this.patients.unshift(newPatient);

    // Record initial history event
    this.addHistoryEvent({
      patientId: newPatient.id,
      type: 'consultation',
      title: 'Patient Registration',
      description: `Patient ${newPatient.fullName} registered at ${newPatient.hospital}`,
      date: new Date().toISOString().split('T')[0],
      doctor: this.doctor.name,
      hospital: this.doctor.hospital
    });

    return newPatient;
  }

  updatePatient(id, data) {
    const idx = this.patients.findIndex((p) => p.id === id || p.patientId === id);
    if (idx === -1) return null;

    this.patients[idx] = { ...this.patients[idx], ...data };
    return this.patients[idx];
  }

  // Allergies & Medications
  getAllergies(patientId) {
    const p = this.getPatientById(patientId);
    const targetId = p ? p.id : patientId;
    return this.allergies.filter((a) => a.patientId === targetId || a.patientId === patientId);
  }

  getMedications(patientId) {
    const p = this.getPatientById(patientId);
    const targetId = p ? p.id : patientId;
    return this.medications.filter((m) => m.patientId === targetId || m.patientId === patientId);
  }

  // Cases
  getCases(patientId) {
    if (!patientId) return this.cases;
    const p = this.getPatientById(patientId);
    const targetId = p ? p.id : patientId;
    return this.cases.filter((c) => c.patientId === targetId || c.patientId === patientId);
  }

  getCaseById(id) {
    return this.cases.find((c) => c.id === id) || null;
  }

  addCase(data) {
    const caseNum = `CASE-2026-${String(this.cases.length + 1).padStart(3, '0')}`;
    const p = this.getPatientById(data.patientId);

    const newCase = {
      id: `case-${Date.now()}`,
      patientId: p ? p.id : data.patientId,
      patientName: p ? p.fullName : (data.patientName || 'Unknown Patient'),
      caseNumber: caseNum,
      doctorId: this.doctor.id,
      doctorName: this.doctor.name,
      hospital: this.doctor.hospital,
      status: data.status || 'Draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      chiefComplaint: data.chiefComplaint || '',
      duration: data.duration || '',
      historyOfPresentIllness: data.historyOfPresentIllness || '',
      symptoms: data.symptoms || '',
      progression: data.progression || '',
      relevantHistory: data.relevantHistory || '',
      pastMedicalHistory: data.pastMedicalHistory || '',
      surgicalHistory: data.surgicalHistory || '',
      familyHistory: data.familyHistory || '',
      personalHistory: data.personalHistory || '',
      allergiesNote: data.allergiesNote || '',
      currentMedicationsNote: data.currentMedicationsNote || '',
      examinationFindings: data.examinationFindings || '',
      investigations: data.investigations || '',
      doctorObservations: data.doctorObservations || '',
      provisionalDiagnosis: data.provisionalDiagnosis || '',
      additionalNotes: data.additionalNotes || ''
    };

    this.cases.unshift(newCase);

    this.addHistoryEvent({
      patientId: newCase.patientId,
      type: 'diagnosis',
      title: `Case Created (${newCase.caseNumber})`,
      description: `Chief Complaint: ${newCase.chiefComplaint || 'Clinical Consultation'}`,
      date: new Date().toISOString().split('T')[0],
      doctor: this.doctor.name,
      hospital: this.doctor.hospital,
      relatedId: newCase.id
    });

    return newCase;
  }

  updateCase(id, data) {
    const idx = this.cases.findIndex((c) => c.id === id);
    if (idx === -1) return null;

    this.cases[idx] = {
      ...this.cases[idx],
      ...data,
      updatedAt: new Date().toISOString()
    };
    return this.cases[idx];
  }

  confirmCase(id) {
    const idx = this.cases.findIndex((c) => c.id === id);
    if (idx === -1) return null;

    const now = new Date().toISOString();
    this.cases[idx].status = 'Confirmed';
    this.cases[idx].confirmedAt = now;
    this.cases[idx].updatedAt = now;

    return this.cases[idx];
  }

  // Documents
  getDocuments(patientId) {
    if (!patientId) return this.documents;
    const p = this.getPatientById(patientId);
    const targetId = p ? p.id : patientId;
    return this.documents.filter((d) => d.patientId === targetId || d.patientId === patientId);
  }

  addDocument(docData) {
    const p = this.getPatientById(docData.patientId);
    const newDoc = {
      id: `doc-${Date.now()}`,
      patientId: p ? p.id : docData.patientId,
      patientName: p ? p.fullName : (docData.patientName || 'Patient'),
      documentName: docData.documentName || 'Medical Document',
      documentType: docData.documentType || 'Other',
      fileUrl: docData.fileUrl || '/uploads/sample.pdf',
      fileSize: docData.fileSize || '1.0 MB',
      uploadedBy: this.doctor.name,
      uploadedAt: new Date().toISOString(),
      status: docData.status || 'Available',
      extractedInfo: docData.extractedInfo || 'Medical record processed successfully.',
      tags: docData.tags || ['Document']
    };

    this.documents.unshift(newDoc);

    this.addHistoryEvent({
      patientId: newDoc.patientId,
      type: 'document',
      title: `Document Uploaded: ${newDoc.documentName}`,
      description: `Type: ${newDoc.documentType}`,
      date: new Date().toISOString().split('T')[0],
      doctor: this.doctor.name,
      hospital: this.doctor.hospital,
      relatedId: newDoc.id
    });

    return newDoc;
  }

  deleteDocument(id) {
    const idx = this.documents.findIndex((d) => d.id === id);
    if (idx !== -1) {
      this.documents.splice(idx, 1);
      return true;
    }
    return false;
  }

  // Prescriptions
  getPrescriptions(patientId) {
    if (!patientId) return this.prescriptions;
    const p = this.getPatientById(patientId);
    const targetId = p ? p.id : patientId;
    return this.prescriptions.filter((rx) => rx.patientId === targetId || rx.patientId === patientId);
  }

  addPrescription(data) {
    const rxNum = `RX-2026-${String(this.prescriptions.length + 100).padStart(3, '0')}`;
    const p = this.getPatientById(data.patientId);

    const newRx = {
      id: `rx-${Date.now()}`,
      prescriptionNumber: rxNum,
      patientId: p ? p.id : data.patientId,
      patientName: p ? p.fullName : (data.patientName || 'Patient'),
      doctorId: this.doctor.id,
      doctorName: this.doctor.name,
      hospital: this.doctor.hospital,
      caseId: data.caseId || '',
      medicines: data.medicines || [],
      notes: data.notes || '',
      status: data.status || 'Draft',
      createdAt: new Date().toISOString()
    };

    this.prescriptions.unshift(newRx);

    this.addHistoryEvent({
      patientId: newRx.patientId,
      type: 'prescription',
      title: `Prescription Created (${newRx.prescriptionNumber})`,
      description: `Contains ${newRx.medicines.length} prescribed medication(s).`,
      date: new Date().toISOString().split('T')[0],
      doctor: this.doctor.name,
      hospital: this.doctor.hospital,
      relatedId: newRx.id
    });

    return newRx;
  }

  confirmPrescription(id) {
    const idx = this.prescriptions.findIndex((rx) => rx.id === id);
    if (idx === -1) return null;

    const now = new Date().toISOString();
    this.prescriptions[idx].status = 'Confirmed';
    this.prescriptions[idx].confirmedAt = now;

    return this.prescriptions[idx];
  }

  // Medical History
  getHistory(patientId) {
    const p = this.getPatientById(patientId);
    const targetId = p ? p.id : patientId;
    return this.historyEvents.filter((h) => h.patientId === targetId || h.patientId === patientId);
  }

  addHistoryEvent(event) {
    const newEvent = {
      id: `hist-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      patientId: event.patientId,
      type: event.type || 'consultation',
      title: event.title,
      description: event.description,
      date: event.date || new Date().toISOString().split('T')[0],
      doctor: event.doctor || this.doctor.name,
      hospital: event.hospital || this.doctor.hospital,
      details: event.details || {},
      relatedId: event.relatedId || ''
    };
    this.historyEvents.unshift(newEvent);
    return newEvent;
  }

  // Hospital Records
  getHospitalRecords(patientId) {
    const p = this.getPatientById(patientId);
    const targetId = p ? p.id : patientId;
    return this.hospitalRecords.filter((hr) => hr.patientId === targetId || hr.patientId === patientId);
  }

  requestHospitalRecordAccess(recordId) {
    const idx = this.hospitalRecords.findIndex((hr) => hr.id === recordId);
    if (idx === -1) return null;

    this.hospitalRecords[idx] = {
      ...this.hospitalRecords[idx],
      authorizationStatus: 'Access Requested',
      accessStatus: 'Access Requested',
      requestedAt: new Date().toISOString()
    };
    return this.hospitalRecords[idx];
  }
}

const mockStore = new MockStore();
module.exports = mockStore;
