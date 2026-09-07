import { apiGet } from './apiClient';
import type { HistoryEvent } from '../types';

export const historyService = {
  async getHistory(patientId: string): Promise<HistoryEvent[]> {
    return apiGet(`/patients/${patientId}/history`);
  },
};
