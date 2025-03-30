import envConfig from '@src/config/env-config.config';
import { API_ROUTES } from '@src/constants/api-routes.constant';
import { LoginRequest, LoginResponse, SignUpRequest, SignUpResponse } from '@src/models/auth.model';
import { api } from './axios';

class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(payload: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await api.public.post<LoginResponse>(API_ROUTES.AUTH.LOGIN, payload);
      localStorage.setItem(envConfig.auth.tokenKey, response.accessToken);
      localStorage.setItem(envConfig.auth.refreshTokenKey, response.refreshToken);
      localStorage.setItem(envConfig.auth.userKey, JSON.stringify(response.user));
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async signUp(payload: SignUpRequest): Promise<SignUpResponse> {
    try {
      const response = await api.public.post<SignUpResponse>(API_ROUTES.AUTH.SIGN_UP, payload);
      localStorage.setItem(envConfig.auth.tokenKey, response.accessToken);
      localStorage.setItem(envConfig.auth.refreshTokenKey, response.refreshToken);
      localStorage.setItem(envConfig.auth.userKey, JSON.stringify(response.user));
      return response;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }
}

export const authService = AuthService.getInstance();
