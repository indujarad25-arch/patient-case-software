import { apiGet, apiDelete, USE_MOCK } from './apiClient';
import apiClient from './apiClient';
import { mockDocumentService } from '../mock/mockServices';
import { MedicalDocument } from '../types';

export const documentService = {
  async getDocuments(patientId?: string): Promise<MedicalDocument[]> {
    if (USE_MOCK) return mockDocumentService.getDocuments(patientId);
    return apiGet('/documents', { params: { patientId } });
  },
  async uploadDocument(
    data: Partial<MedicalDocument>,
    file: File,
    onProgress?: (pct: number) => void
  ): Promise<MedicalDocument> {
    if (USE_MOCK) return mockDocumentService.uploadDocument(data);
    const form = new FormData();
    form.append('file', file);
    Object.entries(data).forEach(([k, v]) => { if (v != null) form.append(k, String(v)); });
    const res = await apiClient.post<MedicalDocument>('/documents', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (e) => {
        if (onProgress && e.total) onProgress(Math.round((e.loaded * 100) / e.total));
      },
    });
    return res.data;
  },
  async deleteDocument(id: string): Promise<void> {
    if (USE_MOCK) return mockDocumentService.deleteDocument(id);
    return apiDelete(`/documents/${id}`);
  },
};
