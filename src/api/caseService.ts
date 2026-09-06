import { apiGet, apiPost, apiPut, USE_MOCK } from './apiClient';
import { mockCaseService } from '../mock/mockServices';
import { ClinicalCase, CaseFormData } from '../types';

export const caseService = {
  async getCases(patientId?: string): Promise<ClinicalCase[]> {
    if (USE_MOCK) return mockCaseService.getCases(patientId);
    return apiGet('/cases', { params: { patientId } });
  },
  async getCase(id: string): Promise<ClinicalCase> {
    if (USE_MOCK) return mockCaseService.getCase(id);
    return apiGet(`/cases/${id}`);
  },
  async createCase(data: CaseFormData): Promise<ClinicalCase> {
    if (USE_MOCK) return mockCaseService.createCase(data);
    return apiPost('/cases', data);
  },
  async updateCase(id: string, data: Partial<ClinicalCase>): Promise<ClinicalCase> {
    if (USE_MOCK) return mockCaseService.updateCase(id, data);
    return apiPut(`/cases/${id}`, data);
  },
  async confirmCase(id: string): Promise<ClinicalCase> {
    if (USE_MOCK) return mockCaseService.confirmCase(id);
    return apiPost(`/cases/${id}/confirm`);
  },
};
