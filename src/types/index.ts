// ─── Auth ───────────────────────────────────────────────────────────────────

export interface Doctor {
  id: string;
  name: string;
  email: string;
  mobile: string;
  specialization: string;
  hospital: string;
  hospitalId: string;
  licenseNumber: string;
  department: string;
  avatar?: string;
  role: 'doctor' | 'admin';
}

export interface AuthState {
  doctor: Doctor | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  identifier: string; // email or mobile
  password: string;
}

export interface OTPVerification {
  identifier: string;
  otp: string;
}

// ─── Patient ─────────────────────────────────────────────────────────────────

export type Gender = 'Male' | 'Female' | 'Other' | 'Prefer not to say';
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | 'Unknown';
export type PatientStatus = 'Active' | 'Inactive' | 'Discharged';

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface Patient {
  id: string;
  patientId: string;
  fullName: string;
  dateOfBirth: string;
  age: number;
  gender: Gender;
  bloodGroup: BloodGroup;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  emergencyContact: EmergencyContact;
  status: PatientStatus;
  registeredAt: string;
  registeredBy: string;
  hospital: string;
  lastConsultation?: string;
  photo?: string;
}

export interface PatientRegistrationData {
  fullName: string;
  dateOfBirth: string;
  gender: Gender;
  bloodGroup: BloodGroup;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  emergencyContact: EmergencyContact;
}

// ─── Allergy ─────────────────────────────────────────────────────────────────

export type AllergySeverity = 'Mild' | 'Moderate' | 'Severe' | 'Life-threatening';
export type AllergyType = 'Drug' | 'Food' | 'Environmental' | 'Contact' | 'Other';

export interface Allergy {
  id: string;
  patientId: string;
  allergen: string;
  type: AllergyType;
  severity: AllergySeverity;
  reaction: string;
  dateRecorded: string;
  recordedBy: string;
  notes?: string;
}

// ─── Medication ───────────────────────────────────────────────────────────────

export type MedicationStatus = 'Active' | 'Discontinued' | 'Completed';

export interface Medication {
  id: string;
  patientId: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  status: MedicationStatus;
  prescribedBy: string;
  prescribedDate: string;
  endDate?: string;
}

// ─── Clinical Case ────────────────────────────────────────────────────────────

export type CaseStatus = 'Draft' | 'Under Review' | 'Confirmed' | 'Closed';

export interface ClinicalCase {
  id: string;
  patientId: string;
  patientName: string;
  caseNumber: string;
  doctorId: string;
  doctorName: string;
  hospital: string;
  status: CaseStatus;
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;

  // Form sections
  chiefComplaint: string;
  duration: string;
  historyOfPresentIllness: string;
  symptoms: string;
  progression: string;
  relevantHistory: string;
  pastMedicalHistory: string;
  surgicalHistory: string;
  familyHistory: string;
  personalHistory: string;
  allergiesNote: string;
  currentMedicationsNote: string;
  examinationFindings: string;
  investigations: string;
  doctorObservations: string;
  provisionalDiagnosis: string;
  additionalNotes: string;
}

export type CaseFormData = Omit<
  ClinicalCase,
  'id' | 'caseNumber' | 'doctorId' | 'doctorName' | 'hospital' | 'createdAt' | 'updatedAt' | 'confirmedAt'
>;

// ─── Prescription ─────────────────────────────────────────────────────────────

export type PrescriptionStatus = 'Draft' | 'Confirmed' | 'Dispensed';

export interface PrescriptionMedicine {
  id: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface Prescription {
  id: string;
  prescriptionNumber: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  hospital: string;
  caseId?: string;
  medicines: PrescriptionMedicine[];
  notes: string;
  status: PrescriptionStatus;
  createdAt: string;
  confirmedAt?: string;
}

// ─── Medical Document ─────────────────────────────────────────────────────────

export type DocumentType =
  | 'Lab Report'
  | 'Radiology'
  | 'Prescription'
  | 'Discharge Summary'
  | 'Scanned Report'
  | 'Other';

export type DocumentStatus = 'Processing' | 'Available' | 'Error';

export interface MedicalDocument {
  id: string;
  patientId: string;
  patientName: string;
  documentName: string;
  documentType: DocumentType;
  fileUrl: string;
  fileSize: string;
  uploadedBy: string;
  uploadedAt: string;
  status: DocumentStatus;
  extractedInfo?: string;
  tags?: string[];
}

// ─── Medical History ──────────────────────────────────────────────────────────

export type HistoryEventType =
  | 'consultation'
  | 'diagnosis'
  | 'medication'
  | 'lab_report'
  | 'document'
  | 'hospital_visit'
  | 'surgery'
  | 'prescription';

export interface HistoryEvent {
  id: string;
  patientId: string;
  type: HistoryEventType;
  title: string;
  description: string;
  date: string;
  doctor?: string;
  hospital?: string;
  details?: Record<string, string | number | boolean>;
  relatedId?: string;
}

// ─── Hospital Records ─────────────────────────────────────────────────────────

export type AccessStatus = 'Access Granted' | 'Access Requested' | 'Access Pending' | 'Access Denied';

export interface HospitalRecord {
  id: string;
  patientId: string;
  sourceHospital: string;
  recordType: string;
  date: string;
  retrievedInfo: string;
  authorizationStatus: AccessStatus;
  accessStatus: AccessStatus;
  requestedAt?: string;
  grantedAt?: string;
  expiresAt?: string;
}

// ─── Doctor AI ────────────────────────────────────────────────────────────────

export interface AIMessage {
  id: string;
  role: 'doctor' | 'ai';
  content: string;
  timestamp: string;
  sources?: AISource[];
  isLoading?: boolean;
}

export interface AISource {
  type: string;
  title: string;
  date?: string;
  id?: string;
}

export interface AIQueryRequest {
  patientId: string;
  question: string;
  conversationHistory?: { role: string; content: string }[];
}

export interface AIQueryResponse {
  answer: string;
  sources: AISource[];
  conversationId?: string;
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export interface DashboardStats {
  totalPatients: number;
  recentConsultations: number;
  pendingCaseReviews: number;
  recentDocuments: number;
}

// ─── API ──────────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SearchParams {
  query?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filter?: Record<string, string>;
}
