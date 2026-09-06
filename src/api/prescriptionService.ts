import { apiGet, apiPost, USE_MOCK } from './apiClient';
import { mockPrescriptionService } from '../mock/mockServices';
import { Prescription } from '../types';

export const prescriptionService = {
  async getPrescriptions(patientId?: string): Promise<Prescription[]> {
    if (USE_MOCK) return mockPrescriptionService.getPrescriptions(patientId);
    return apiGet('/prescriptions', { params: { patientId } });
  },
  async createPrescription(data: Partial<Prescription>): Promise<Prescription> {
    if (USE_MOCK) return mockPrescriptionService.createPrescription(data);
    return apiPost('/prescriptions', data);
  },
  async confirmPrescription(id: string): Promise<Prescription> {
    if (USE_MOCK) return mockPrescriptionService.confirmPrescription(id);
    return apiPost(`/prescriptions/${id}/confirm`);
  },
};
