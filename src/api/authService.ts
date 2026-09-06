import { apiGet, apiPost, USE_MOCK } from './apiClient';
import { mockAuthService } from '../mock/mockServices';
import { Doctor, LoginCredentials, OTPVerification } from '../types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ doctor: Doctor; requiresOtp: boolean }> {
    if (USE_MOCK) return mockAuthService.login(credentials.identifier, credentials.password);
    return apiPost('/auth/login', credentials);
  },

  async verifyOtp(data: OTPVerification): Promise<{ doctor: Doctor; token: string }> {
    if (USE_MOCK) return mockAuthService.verifyOtp(data.identifier, data.otp);
    return apiPost('/auth/verify-otp', data);
  },

  async logout(): Promise<void> {
    if (USE_MOCK) return mockAuthService.logout();
    return apiPost('/auth/logout');
  },

  async getProfile(): Promise<Doctor> {
    if (USE_MOCK) {
      const { MOCK_DOCTOR } = await import('../mock/mockData');
      return MOCK_DOCTOR;
    }
    return apiGet('/auth/profile');
  },
};
