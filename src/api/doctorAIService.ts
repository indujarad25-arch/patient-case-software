import { apiPost, USE_MOCK } from './apiClient';
import { mockDoctorAIService } from '../mock/mockServices';
import { AIQueryRequest, AIQueryResponse } from '../types';

export const doctorAIService = {
  async query(req: AIQueryRequest): Promise<AIQueryResponse> {
    if (USE_MOCK) return mockDoctorAIService.query(req);
    return apiPost('/doctor-ai/query', req);
  },
};
