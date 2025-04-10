import { apiClient } from '@/lib/api';
import { LoginCredentials, User } from '@/types/auth';

class AuthService {
  public isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  public async login(credentials: LoginCredentials): Promise<User> {
    try {
      // For this assessment, we'll simulate auth with the fake API
      const response = await apiClient.post<User>('/users', credentials);

      // Simulate getting a token
      const fakeToken = btoa(`${credentials.email}:${Date.now()}`);
      localStorage.setItem('token', fakeToken);

      // Create user object
      const user = {
        id: response.id || 1,
        email: credentials.email,
        name: credentials.email.split('@')[0],
      };

      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Authentication failed. Please check your credentials.');
    }
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  public getCurrentUser(): User | null {
    const userJson = localStorage.getItem('user');
    if (!userJson) return null;
    
    try {
      return JSON.parse(userJson) as User;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }
}

export const authService = new AuthService();