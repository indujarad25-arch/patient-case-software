import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Doctor, AuthState } from '../types';
import { authService } from '../api/authService';

interface AuthContextValue extends AuthState {
  login: (identifier: string, password: string) => Promise<{ requiresOtp: boolean }>;
  verifyOtp: (identifier: string, otp: string) => Promise<void>;
  logout: () => void;
  pendingIdentifier: string;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    doctor: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const [pendingIdentifier, setPendingIdentifier] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const doctorJson = localStorage.getItem('auth_doctor');
    if (token && doctorJson) {
      try {
        const doctor: Doctor = JSON.parse(doctorJson);
        setState({ doctor, token, isAuthenticated: true, isLoading: false });
      } catch {
        setState((s) => ({ ...s, isLoading: false }));
      }
    } else {
      setState((s) => ({ ...s, isLoading: false }));
    }
  }, []);

  const login = async (identifier: string, password: string) => {
    setState((s) => ({ ...s, isLoading: true }));
    try {
      const result = await authService.login({ identifier, password });
      setPendingIdentifier(identifier);
      setState((s) => ({ ...s, isLoading: false }));
      return { requiresOtp: result.requiresOtp };
    } catch (err) {
      setState((s) => ({ ...s, isLoading: false }));
      throw err;
    }
  };

  const verifyOtp = async (identifier: string, otp: string) => {
    setState((s) => ({ ...s, isLoading: true }));
    try {
      const { doctor, token } = await authService.verifyOtp({ identifier, otp });
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_doctor', JSON.stringify(doctor));
      setState({ doctor, token, isAuthenticated: true, isLoading: false });
    } catch (err) {
      setState((s) => ({ ...s, isLoading: false }));
      throw err;
    }
  };

  const logout = () => {
    authService.logout().catch(() => {});
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_doctor');
    setState({ doctor: null, token: null, isAuthenticated: false, isLoading: false });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, verifyOtp, logout, pendingIdentifier }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
