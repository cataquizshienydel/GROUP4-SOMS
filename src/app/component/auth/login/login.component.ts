import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

type UserRole = 'admin' | 'officer' | 'student';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  selectedRole: UserRole = 'student';

  // Admin fields
  adminEmail: string = '';
  adminPassword: string = '';

  // Officer fields
  officerEmail: string = '';
  officerPassword: string = '';

  // Student fields
  studentId: string = '';
  selectedCourse: string = '';

  courses: string[] = [
    'Information Technology (IT)',
    'Electro-Mechanical Engineering Technology(EMT)',
    'Technology Communication Management (TCM)',
    
  ];

  constructor(private router: Router) {}

  selectRole(role: UserRole): void {
    this.selectedRole = role;
  }

  onLogin(): void {
  if (this.selectedRole === 'admin') {
    this.router.navigate(['/admin/dashboard']);
  } else if (this.selectedRole === 'officer') {
    this.router.navigate(['/officer/dashboard']);
  } else {
    this.router.navigate(['/student/dashboard']);
  }
  }
  }