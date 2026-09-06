const seedDoctor = {
  id: 'DOC-101',
  name: 'Dr. Rajesh Sharma',
  email: 'doctor@medicare.com',
  mobile: '+91 98765 43210',
  specialization: 'General Cardiology & Internal Medicine',
  hospital: 'MediCare Super Speciality Hospital',
  hospitalId: 'HOSP-4002',
  licenseNumber: 'MCI-2015-884920',
  department: 'Cardiology Department',
  avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
  role: 'doctor'
};

const seedPatients = [
  {
    id: 'pt_1001',
    patientId: 'PT-1001',
    fullName: 'Arun Kumar',
    dateOfBirth: '1984-05-12',
    age: 42,
    gender: 'Male',
    bloodGroup: 'B+',
    phone: '+91 98765 11111',
    email: 'arun.kumar@gmail.com',
    address: '45 Green Park Avenue',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110016',
    emergencyContact: {
      name: 'Sunita Kumar',
      relationship: 'Wife',
      phone: '+91 98765 11112'
    },
    status: 'Active',
    registeredAt: '2026-01-15T10:30:00Z',
    registeredBy: 'Dr. Rajesh Sharma',
    hospital: 'MediCare Super Speciality Hospital',
    lastConsultation: '2026-03-01T14:20:00Z',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'pt_1002',
    patientId: 'PT-1002',
    fullName: 'Priya Sharma',
    dateOfBirth: '1997-08-23',
    age: 29,
    gender: 'Female',
    bloodGroup: 'O+',
    phone: '+91 98765 22222',
    email: 'priya.sharma@gmail.com',
    address: '12 Sector 15',
    city: 'Gurugram',
    state: 'Haryana',
    pincode: '122001',
    emergencyContact: {
      name: 'Vikram Sharma',
      relationship: 'Brother',
      phone: '+91 98765 22223'
    },
    status: 'Active',
    registeredAt: '2026-02-10T09:15:00Z',
    registeredBy: 'Dr. Rajesh Sharma',
    hospital: 'MediCare Super Speciality Hospital',
    lastConsultation: '2026-03-04T11:00:00Z',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'pt_1003',
    patientId: 'PT-1003',
    fullName: 'Rahul Raj',
    dateOfBirth: '1991-11-04',
    age: 35,
    gender: 'Male',
    bloodGroup: 'A+',
    phone: '+91 98765 33333',
    email: 'rahul.raj@gmail.com',
    address: '88 MG Road',
    city: 'Noida',
    state: 'Uttar Pradesh',
    pincode: '201301',
    emergencyContact: {
      name: 'Anjali Raj',
      relationship: 'Spouse',
      phone: '+91 98765 33334'
    },
    status: 'Active',
    registeredAt: '2026-02-18T16:45:00Z',
    registeredBy: 'Dr. Rajesh Sharma',
    hospital: 'MediCare Super Speciality Hospital',
    lastConsultation: '2026-03-05T16:10:00Z',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  }
];

const seedAllergies = [
  {
    id: 'alg-1',
    patientId: 'pt_1001',
    allergen: 'Penicillin',
    type: 'Drug',
    severity: 'Severe',
    reaction: 'Anaphylaxis, Urticaria',
    dateRecorded: '2024-06-12',
    recordedBy: 'Dr. Rajesh Sharma',
    notes: 'Strictly avoid beta-lactam antibiotics'
  },
  {
    id: 'alg-2',
    patientId: 'pt_1001',
    allergen: 'Dust Mites',
    type: 'Environmental',
    severity: 'Mild',
    reaction: 'Allergic Rhinitis, Sneezing',
    dateRecorded: '2025-01-20',
    recordedBy: 'Dr. Rajesh Sharma'
  },
  {
    id: 'alg-3',
    patientId: 'pt_1002',
    allergen: 'Peanuts',
    type: 'Food',
    severity: 'Life-threatening',
    reaction: 'Bronchospasm & Swelling',
    dateRecorded: '2023-11-05',
    recordedBy: 'Dr. Rajesh Sharma'
  }
];

const seedMedications = [
  {
    id: 'med-1',
    patientId: 'pt_1001',
    medicineName: 'Amlodipine',
    dosage: '5 mg',
    frequency: 'Once Daily (Morning)',
    duration: '90 Days',
    instructions: 'Take with or without food. Monitor blood pressure.',
    status: 'Active',
    prescribedBy: 'Dr. Rajesh Sharma',
    prescribedDate: '2026-01-15'
  },
  {
    id: 'med-2',
    patientId: 'pt_1001',
    medicineName: 'Telmisartan',
    dosage: '40 mg',
    frequency: 'Once Daily (Evening)',
    duration: '90 Days',
    instructions: 'Take after dinner.',
    status: 'Active',
    prescribedBy: 'Dr. Rajesh Sharma',
    prescribedDate: '2026-01-15'
  },
  {
    id: 'med-3',
    patientId: 'pt_1002',
    medicineName: 'Sumatriptan',
    dosage: '50 mg',
    frequency: 'As needed at onset of migraine',
    duration: '30 Days',
    instructions: 'Maximum 100 mg in 24 hours',
    status: 'Active',
    prescribedBy: 'Dr. Rajesh Sharma',
    prescribedDate: '2026-02-10'
  }
];

const seedCases = [
  {
    id: 'case-101',
    patientId: 'pt_1001',
    patientName: 'Arun Kumar',
    caseNumber: 'CASE-2026-001',
    doctorId: 'DOC-101',
    doctorName: 'Dr. Rajesh Sharma',
    hospital: 'MediCare Super Speciality Hospital',
    status: 'Confirmed',
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-01T11:30:00Z',
    confirmedAt: '2026-03-01T11:30:00Z',
    chiefComplaint: 'Occipital Headache and Fatigue for 2 weeks',
    duration: '14 Days',
    historyOfPresentIllness: 'Patient reports gradual onset of morning headache located in the occipital region. Associated with mild dizziness upon standing.',
    symptoms: 'Headache, Dizziness, Mild Palpitations',
    progression: 'Headaches increasing in frequency over the last 3 days.',
    relevantHistory: 'Essential Hypertension diagnosed in 2022.',
    pastMedicalHistory: 'Hypertension (4 years). No history of diabetes or asthma.',
    surgicalHistory: 'Appendectomy (2015)',
    familyHistory: 'Father had hypertension and CAD.',
    personalHistory: 'Non-smoker, moderate tea drinker, sedentary lifestyle.',
    allergiesNote: 'Known Penicillin allergy (Severe)',
    currentMedicationsNote: 'Amlodipine 5mg OD',
    examinationFindings: 'BP: 154/96 mmHg, Pulse: 82 bpm, SpO2: 98% on room air. S1 S2 heard, no murmurs.',
    investigations: 'ECG: Normal sinus rhythm. Serum Creatinine: 0.9 mg/dL. Lipid Profile: Mild LDL elevation (135 mg/dL).',
    doctorObservations: 'Uncontrolled Essential Hypertension. Blood pressure elevated despite current monotherapy.',
    provisionalDiagnosis: 'Stage 2 Essential Hypertension',
    additionalNotes: 'Added Telmisartan 40mg OD. Recommended 30-min daily walk and low sodium diet.'
  }
];

const seedDocuments = [
  {
    id: 'doc-1',
    patientId: 'pt_1001',
    patientName: 'Arun Kumar',
    documentName: 'Lipid Profile & Renal Function Test.pdf',
    documentType: 'Lab Report',
    fileUrl: '/uploads/lipid_report.pdf',
    fileSize: '1.4 MB',
    uploadedBy: 'Dr. Rajesh Sharma',
    uploadedAt: '2026-03-01T10:15:00Z',
    status: 'Available',
    extractedInfo: 'Serum Cholesterol: 210 mg/dL, LDL: 135 mg/dL, HDL: 42 mg/dL, Triglycerides: 165 mg/dL, Serum Creatinine: 0.9 mg/dL.',
    tags: ['Lab', 'Lipid', 'Blood Test']
  },
  {
    id: 'doc-2',
    patientId: 'pt_1001',
    patientName: 'Arun Kumar',
    documentName: 'ECG Report 12-Lead.pdf',
    documentType: 'Radiology',
    fileUrl: '/uploads/ecg_report.pdf',
    fileSize: '850 KB',
    uploadedBy: 'Dr. Rajesh Sharma',
    uploadedAt: '2026-03-01T10:45:00Z',
    status: 'Available',
    extractedInfo: 'Normal sinus rhythm, Rate: 78 bpm, PR interval: 140ms, QRS duration: 88ms. No ST-T changes.',
    tags: ['ECG', 'Cardiology']
  }
];

const seedPrescriptions = [
  {
    id: 'rx-101',
    prescriptionNumber: 'RX-2026-089',
    patientId: 'pt_1001',
    patientName: 'Arun Kumar',
    doctorId: 'DOC-101',
    doctorName: 'Dr. Rajesh Sharma',
    hospital: 'MediCare Super Speciality Hospital',
    caseId: 'case-101',
    medicines: [
      {
        id: 'rxm-1',
        medicineName: 'Amlodipine',
        dosage: '5 mg',
        frequency: '1-0-0 (Morning after breakfast)',
        duration: '30 Days',
        instructions: 'Continue daily.'
      },
      {
        id: 'rxm-2',
        medicineName: 'Telmisartan',
        dosage: '40 mg',
        frequency: '0-0-1 (Night after dinner)',
        duration: '30 Days',
        instructions: 'Take regularly at night.'
      }
    ],
    notes: 'Follow low sodium diet (less than 2g salt/day). Repeat BP check in 2 weeks.',
    status: 'Confirmed',
    createdAt: '2026-03-01T11:45:00Z',
    confirmedAt: '2026-03-01T11:45:00Z'
  }
];

const seedHistoryEvents = [
  {
    id: 'hist-1',
    patientId: 'pt_1001',
    type: 'consultation',
    title: 'Hypertension Follow-up Consultation',
    description: 'Patient presented with headache. BP elevated at 154/96 mmHg. Dosage adjusted.',
    date: '2026-03-01',
    doctor: 'Dr. Rajesh Sharma',
    hospital: 'MediCare Super Speciality Hospital',
    relatedId: 'case-101'
  },
  {
    id: 'hist-2',
    patientId: 'pt_1001',
    type: 'lab_report',
    title: 'Lipid & Renal Profile Uploaded',
    description: 'Comprehensive blood tests processed. Serum creatinine normal, mild hyperlipidemia.',
    date: '2026-03-01',
    doctor: 'Dr. Rajesh Sharma',
    hospital: 'MediCare Super Speciality Hospital',
    relatedId: 'doc-1'
  },
  {
    id: 'hist-3',
    patientId: 'pt_1001',
    type: 'prescription',
    title: 'Prescription Issued (RX-2026-089)',
    description: 'Prescribed Amlodipine 5mg & Telmisartan 40mg for 30 days.',
    date: '2026-03-01',
    doctor: 'Dr. Rajesh Sharma',
    hospital: 'MediCare Super Speciality Hospital',
    relatedId: 'rx-101'
  }
];

const seedHospitalRecords = [
  {
    id: 'hrec-1',
    patientId: 'pt_1001',
    sourceHospital: 'Apollo Heart Institute, New Delhi',
    recordType: 'Discharge Summary & Echo',
    date: '2024-05-10',
    retrievedInfo: 'Patient admitted for routine cardiac evaluation. 2D Echo showed normal EF (62%), intact valves.',
    authorizationStatus: 'Access Granted',
    accessStatus: 'Access Granted',
    grantedAt: '2026-02-01T09:00:00Z',
    expiresAt: '2026-12-31T23:59:59Z'
  },
  {
    id: 'hrec-2',
    patientId: 'pt_1001',
    sourceHospital: 'Max Healthcare Hospital, Saket',
    recordType: 'Historical Blood & Lipid Records (2023)',
    date: '2023-10-18',
    retrievedInfo: 'Historical lab values for comparative analysis.',
    authorizationStatus: 'Access Pending',
    accessStatus: 'Access Pending'
  }
];

module.exports = {
  seedDoctor,
  seedPatients,
  seedAllergies,
  seedMedications,
  seedCases,
  seedDocuments,
  seedPrescriptions,
  seedHistoryEvents,
  seedHospitalRecords
};
