import { apiGet, apiDelete } from './apiClient';
import apiClient from './apiClient';
import type { MedicalDocument } from '../types';

export const documentService = {
  async getDocuments(patientId?: string): Promise<MedicalDocument[]> {
    return apiGet('/documents', { params: { patientId } });
  },
  async uploadDocument(
    data: Partial<MedicalDocument>,
    file?: File,
    onProgress?: (pct: number) => void
  ): Promise<MedicalDocument> {
    const form = new FormData();
    if (file) form.append('file', file);
    Object.entries(data).forEach(([k, v]) => {
      if (v != null) form.append(k, String(v));
    });
    const res = await apiClient.post<MedicalDocument>('/documents', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (e) => {
        if (onProgress && e.total) onProgress(Math.round((e.loaded * 100) / e.total));
      },
    });
    return res.data;
  },
  async deleteDocument(id: string): Promise<void> {
    return apiDelete(`/documents/${id}`);
  },
};
