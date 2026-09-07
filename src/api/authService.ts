import { apiGet, apiPost, USE_MOCK } from './apiClient';
import type { Doctor, LoginCredentials, OTPVerification } from '../types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ doctor: Doctor; token?: string; requiresOtp: boolean }> {
    if (USE_MOCK) {
      return {
        doctor: {
          id: 'DOC-101',
          name: 'Dr. Rajesh Sharma',
          email: credentials.identifier,
          mobile: '+91 98765 43210',
          specialization: 'General Cardiology & Internal Medicine',
          hospital: 'MediCare Super Speciality Hospital',
          hospitalId: 'HOSP-4002',
          licenseNumber: 'MCI-2015-884920',
          department: 'Cardiology Department',
          role: 'doctor'
        },
        token: 'mock-token',
        requiresOtp: false
      };
    }
    return apiPost('/auth/login', credentials);
  },

  async verifyOtp(data: OTPVerification): Promise<{ doctor: Doctor; token: string }> {
    if (USE_MOCK) {
      return {
        doctor: {
          id: 'DOC-101',
          name: 'Dr. Rajesh Sharma',
          email: data.identifier,
          mobile: '+91 98765 43210',
          specialization: 'General Cardiology & Internal Medicine',
          hospital: 'MediCare Super Speciality Hospital',
          hospitalId: 'HOSP-4002',
          licenseNumber: 'MCI-2015-884920',
          department: 'Cardiology Department',
          role: 'doctor'
        },
        token: 'mock-token'
      };
    }
    return apiPost('/auth/verify-otp', data);
  },

  async logout(): Promise<void> {
    if (USE_MOCK) return;
    return apiPost('/auth/logout');
  },

  async getProfile(): Promise<Doctor> {
    if (USE_MOCK) {
      return {
        id: 'DOC-101',
        name: 'Dr. Rajesh Sharma',
        email: 'doctor@medicare.com',
        mobile: '+91 98765 43210',
        specialization: 'General Cardiology & Internal Medicine',
        hospital: 'MediCare Super Speciality Hospital',
        hospitalId: 'HOSP-4002',
        licenseNumber: 'MCI-2015-884920',
        department: 'Cardiology Department',
        role: 'doctor'
      };
    }
    return apiGet('/auth/profile');
  },
};
