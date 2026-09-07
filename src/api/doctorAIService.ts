import { apiPost } from './apiClient';
import type { AIQueryRequest, AIQueryResponse } from '../types';

export const doctorAIService = {
  async query(req: AIQueryRequest): Promise<AIQueryResponse> {
    return apiPost('/doctor-ai/query', req);
  },
};
