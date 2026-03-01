// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(credentials: { email?: string; studentId?: string; password: string }): Observable<any[]> {
    if (credentials.email) {
      return this.http.get<any[]>(`${this.apiUrl}/users?email=${credentials.email}&password=${credentials.password}`);
    } else {
      return this.http.get<any[]>(`${this.apiUrl}/users?studentId=${credentials.studentId}&password=${credentials.password}`);
    }
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  setCurrentUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }
}
