import { apiGet, apiPost, apiPut } from './apiClient';
import type { Patient, PatientRegistrationData, Allergy, Medication, PaginatedResponse, SearchParams } from '../types';

export const patientService = {
  async getPatients(params?: SearchParams): Promise<PaginatedResponse<Patient>> {
    return apiGet('/patients', { params });
  },

  async getPatient(id: string): Promise<Patient> {
    return apiGet(`/patients/${id}`);
  },

  async registerPatient(data: PatientRegistrationData): Promise<Patient> {
    return apiPost('/patients', data);
  },

  async updatePatient(id: string, data: Partial<Patient>): Promise<Patient> {
    return apiPut(`/patients/${id}`, data);
  },

  async getAllergies(patientId: string): Promise<Allergy[]> {
    return apiGet(`/patients/${patientId}/allergies`);
  },

  async getMedications(patientId: string): Promise<Medication[]> {
    return apiGet(`/patients/${patientId}/medications`);
  },
};
