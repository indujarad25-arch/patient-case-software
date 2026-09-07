import { apiGet, apiPost } from './apiClient';
import type { HospitalRecord } from '../types';

export const hospitalRecordService = {
  async getRecords(patientId: string): Promise<HospitalRecord[]> {
    return apiGet(`/hospital-records/${patientId}`);
  },
  async requestAccess(recordId: string): Promise<HospitalRecord> {
    return apiPost(`/hospital-records/${recordId}/request-access`);
  },
};
