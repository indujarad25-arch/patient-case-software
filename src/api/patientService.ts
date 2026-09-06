import { apiGet, apiPost, apiPut, USE_MOCK } from './apiClient';
import { mockPatientService } from '../mock/mockServices';
import { Patient, PatientRegistrationData, Allergy, Medication, PaginatedResponse, SearchParams } from '../types';

export const patientService = {
  async getPatients(params?: SearchParams): Promise<PaginatedResponse<Patient>> {
    if (USE_MOCK) return mockPatientService.getPatients(params);
    return apiGet('/patients', { params });
  },

  async getPatient(id: string): Promise<Patient> {
    if (USE_MOCK) return mockPatientService.getPatient(id);
    return apiGet(`/patients/${id}`);
  },

  async registerPatient(data: PatientRegistrationData): Promise<Patient> {
    if (USE_MOCK) return mockPatientService.registerPatient(data);
    return apiPost('/patients', data);
  },

  async updatePatient(id: string, data: Partial<Patient>): Promise<Patient> {
    if (USE_MOCK) return mockPatientService.updatePatient(id, data);
    return apiPut(`/patients/${id}`, data);
  },

  async getAllergies(patientId: string): Promise<Allergy[]> {
    if (USE_MOCK) return mockPatientService.getAllergies(patientId);
    return apiGet(`/patients/${patientId}/allergies`);
  },

  async getMedications(patientId: string): Promise<Medication[]> {
    if (USE_MOCK) return mockPatientService.getMedications(patientId);
    return apiGet(`/patients/${patientId}/medications`);
  },
};
