
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    if (!this.email.trim() || !this.password.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please enter your email and password.',
        confirmButtonColor: '#2a4a8a'
      });
      return;
    }

    this.isLoading = true;

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (users) => {
        this.isLoading = false;
        if (users && users.length > 0) {
          const user = users[0];
          this.authService.setCurrentUser(user);

          Swal.fire({
            icon: 'success',
            title: `Welcome, ${user.name}!`,
            text: `Logged in as ${user.role.toUpperCase()}`,
            timer: 1500,
            showConfirmButton: false,
            confirmButtonColor: '#2a4a8a'
          }).then(() => {
            if (user.role === 'admin') {
              this.router.navigate(['/admin/dashboard']);
            } else if (user.role === 'officer') {
              this.router.navigate(['/officer/dashboard']);
            } else {
              this.router.navigate(['/student/dashboard']);
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid email or password. Please try again.',
            confirmButtonColor: '#2a4a8a'
          });
        }
      },
      error: () => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Server Error',
          text: 'Cannot connect to server. Please try again later.',
          confirmButtonColor: '#2a4a8a'
        });
      }
    });
  }
}