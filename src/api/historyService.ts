import { apiGet, USE_MOCK } from './apiClient';
import { mockHistoryService } from '../mock/mockServices';
import { HistoryEvent } from '../types';

export const historyService = {
  async getHistory(patientId: string): Promise<HistoryEvent[]> {
    if (USE_MOCK) return mockHistoryService.getHistory(patientId);
    return apiGet(`/patients/${patientId}/history`);
  },
};
