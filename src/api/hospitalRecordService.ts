import { apiGet, apiPost, USE_MOCK } from './apiClient';
import { mockHospitalRecordService } from '../mock/mockServices';
import { HospitalRecord } from '../types';

export const hospitalRecordService = {
  async getRecords(patientId: string): Promise<HospitalRecord[]> {
    if (USE_MOCK) return mockHospitalRecordService.getRecords(patientId);
    return apiGet(`/hospital-records/${patientId}`);
  },
  async requestAccess(recordId: string): Promise<HospitalRecord> {
    if (USE_MOCK) return mockHospitalRecordService.requestAccess(recordId);
    return apiPost(`/hospital-records/${recordId}/request-access`);
  },
};
