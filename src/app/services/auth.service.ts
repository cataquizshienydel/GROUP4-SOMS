
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(credentials: { email?: string; studentId?: string; password: string }): Observable<any[]> {
    // Get ALL users then filter manually to avoid JSON Server query issues
    return this.http.get<any[]>(`${this.apiUrl}/users`).pipe(
      map(users => {
        return users.filter(user => {
          const passwordMatch = user.password === credentials.password;
          if (credentials.email) {
            return user.email === credentials.email && passwordMatch;
          } else {
            return user.studentId === credentials.studentId && passwordMatch;
          }
        });
      }),
      catchError(() => of([]))
    );
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
