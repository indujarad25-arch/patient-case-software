import { apiGet, apiPost } from './apiClient';
import type { Prescription } from '../types';

export const prescriptionService = {
  async getPrescriptions(patientId?: string): Promise<Prescription[]> {
    return apiGet('/prescriptions', { params: { patientId } });
  },
  async createPrescription(data: Partial<Prescription>): Promise<Prescription> {
    return apiPost('/prescriptions', data);
  },
  async confirmPrescription(id: string): Promise<Prescription> {
    return apiPost(`/prescriptions/${id}/confirm`);
  },
};
