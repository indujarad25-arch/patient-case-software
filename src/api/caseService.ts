import { apiGet, apiPost, apiPut } from './apiClient';
import type { ClinicalCase, CaseFormData } from '../types';

export const caseService = {
  async getCases(patientId?: string): Promise<ClinicalCase[]> {
    return apiGet('/cases', { params: { patientId } });
  },
  async getCase(id: string): Promise<ClinicalCase> {
    return apiGet(`/cases/${id}`);
  },
  async createCase(data: Partial<CaseFormData>): Promise<ClinicalCase> {
    return apiPost('/cases', data);
  },
  async updateCase(id: string, data: Partial<ClinicalCase>): Promise<ClinicalCase> {
    return apiPut(`/cases/${id}`, data);
  },
  async confirmCase(id: string): Promise<ClinicalCase> {
    return apiPost(`/cases/${id}/confirm`);
  },
};
